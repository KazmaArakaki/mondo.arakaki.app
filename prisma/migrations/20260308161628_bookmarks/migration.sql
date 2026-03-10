/*
  Warnings:

  - Added the required column `url` to the `bookmarks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookmarks" ADD COLUMN     "gemini_interaction_id" TEXT,
ADD COLUMN     "url" TEXT NOT NULL;
