-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_bankConnectionId_fkey";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "bankConnectionId" DROP NOT NULL,
ALTER COLUMN "pluggyAccountId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_bankConnectionId_fkey" FOREIGN KEY ("bankConnectionId") REFERENCES "BankConnection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
