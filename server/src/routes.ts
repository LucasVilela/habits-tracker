import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";
import { z } from "zod";
import dayjs from "dayjs";

export async function appRoutes(app: FastifyInstance) {
  app.post("/habits", async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6))
    });

    const { title, weekDays } = createHabitBody.parse(request.body);

    const today = dayjs().startOf("day").toDate();

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((weekDay) => ({ week_day: weekDay }))
        }
      }
    });
  });

  // Get all the habits that are possible to do on a given date

  app.get("/day", async (request) => {
    const getDayParams = z.object({
      // Zod will convert the string to a Date object
      date: z.coerce.date()
    });

    const { date } = getDayParams.parse(request.query);

    const parsedDate = dayjs(date).startOf("day");
    const weekDay = parsedDate.get("day");

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          // Habit created before the date
          lte: date
        },
        weekDays: {
          some: {
            // Habit has a week day that matches the date
            week_day: weekDay
          }
        }
      }
    });

    console.log("date :>> ", date);
    console.log("parsedDate.toDate() :>> ", parsedDate.toDate());
    /**
     * Get the day that matches the date
     * http://localhost:3000/day?date=2023-01-06T03:00:00.000Z
     * Test date "2023-01-06T03:00:00.000Z"
     */

    const day = await prisma.day.findFirst({
      where: {
        date: date
      },
      include: {
        dayHabits: true
      }
    });

    const completedHabits =
      day?.dayHabits.map((dayHabit) => {
        return dayHabit.habit_id;
      }) ?? [];

    return {
      possibleHabits,
      completedHabits
    };
  });
}
