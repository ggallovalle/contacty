-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "contact" (
    "contact_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT,
    "email" TEXT,
    "user_id" INTEGER NOT NULL,
    "address" TEXT,

    PRIMARY KEY ("contact_id")
);

-- AddForeignKey
ALTER TABLE "contact" ADD FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
