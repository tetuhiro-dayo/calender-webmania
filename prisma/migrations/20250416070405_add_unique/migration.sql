/*
  Warnings:

  - A unique constraint covering the columns `[month,year]` on the table `Art` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Art_month_year_key" ON "Art"("month", "year");
