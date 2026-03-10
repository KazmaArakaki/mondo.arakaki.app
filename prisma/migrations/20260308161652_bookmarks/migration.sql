/*
  Warnings:

  - Made the column `gemini_interaction_id` on table `bookmarks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "bookmarks" ALTER COLUMN "gemini_interaction_id" SET NOT NULL;
