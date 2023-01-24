/*
  Warnings:

  - You are about to drop the `DayHabit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "DayHabit_day_id_habit_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DayHabit";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "days_habits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day_id" TEXT NOT NULL,
    "habit_id" TEXT NOT NULL,
    CONSTRAINT "days_habits_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "Day" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "days_habits_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_habits_with_days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habit_id" TEXT NOT NULL,
    "week_day" TEXT NOT NULL,
    CONSTRAINT "habits_with_days_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_habits_with_days" ("habit_id", "id", "week_day") SELECT "habit_id", "id", "week_day" FROM "habits_with_days";
DROP TABLE "habits_with_days";
ALTER TABLE "new_habits_with_days" RENAME TO "habits_with_days";
CREATE UNIQUE INDEX "habits_with_days_habit_id_week_day_key" ON "habits_with_days"("habit_id", "week_day");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "days_habits_day_id_habit_id_key" ON "days_habits"("day_id", "habit_id");
