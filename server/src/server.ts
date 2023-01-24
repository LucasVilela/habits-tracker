import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

const app = Fastify();
const prisma = new PrismaClient();

app.register(cors);

app.get("/", async (request, reply) => {
  const habits = await prisma.habit.findMany();

  return habits;
});

app
  .listen({
    port: 3000
  })
  .then(() => {
    console.log("Server listening on port 3000");
  });
