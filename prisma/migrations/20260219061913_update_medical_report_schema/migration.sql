/*
  Warnings:

  - You are about to drop the column `appointmentId` on the `medical_reports` table. All the data in the column will be lost.
  - You are about to drop the column `diagnosis` on the `medical_reports` table. All the data in the column will be lost.
  - You are about to drop the column `followUpDate` on the `medical_reports` table. All the data in the column will be lost.
  - You are about to drop the column `treatment` on the `medical_reports` table. All the data in the column will be lost.
  - Added the required column `reportLink` to the `medical_reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reportName` to the `medical_reports` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "medical_reports" DROP CONSTRAINT "medical_reports_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "medical_reports" DROP CONSTRAINT "medical_reports_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "medical_reports" DROP CONSTRAINT "medical_reports_patientId_fkey";

-- DropIndex
DROP INDEX "medical_reports_appointmentId_key";

-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "medicalReportId" TEXT;

-- AlterTable
ALTER TABLE "medical_reports" DROP COLUMN "appointmentId",
DROP COLUMN "diagnosis",
DROP COLUMN "followUpDate",
DROP COLUMN "treatment",
ADD COLUMN     "reportLink" TEXT NOT NULL,
ADD COLUMN     "reportName" TEXT NOT NULL,
ALTER COLUMN "doctorId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "medical_reports_patientId_idx" ON "medical_reports"("patientId");

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_medicalReportId_fkey" FOREIGN KEY ("medicalReportId") REFERENCES "medical_reports"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_reports" ADD CONSTRAINT "medical_reports_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_reports" ADD CONSTRAINT "medical_reports_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
