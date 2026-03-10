-- AlterTable
ALTER TABLE "bookmarks" ADD COLUMN     "is_published" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "bookmark_posts" (
    "bookmark_id" CHAR(26) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" CHAR(26) NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "bookmark_posts_pkey" PRIMARY KEY ("bookmark_id")
);

-- AddForeignKey
ALTER TABLE "bookmark_posts" ADD CONSTRAINT "bookmark_posts_bookmark_id_fkey" FOREIGN KEY ("bookmark_id") REFERENCES "bookmarks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
