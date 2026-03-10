-- CreateTable
CREATE TABLE "bookmark_chat_messages" (
    "id" CHAR(26) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "user_id" CHAR(26) NOT NULL,
    "bookmark_id" CHAR(26) NOT NULL,
    "from" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "bookmark_chat_messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bookmark_chat_messages" ADD CONSTRAINT "bookmark_chat_messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmark_chat_messages" ADD CONSTRAINT "bookmark_chat_messages_bookmark_id_fkey" FOREIGN KEY ("bookmark_id") REFERENCES "bookmarks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
