-- CreateTable
CREATE TABLE "Trend" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "Trend_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trend" ADD CONSTRAINT "Trend_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
