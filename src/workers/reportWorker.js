import { db } from '../database.js';
import { generateReport } from '../reportGenerator.js';
import { reportQueue } from '../reportQueue.js';

reportQueue.process(async (message) => {
  const { jobId, studentId } = message;
  try {

  
  // TODO(PART 5): Mark this job as "processing" with db.updateReportJob().
  await db.updateReportJob(jobId, { status: "processing"});
  // TODO(PART 5): Call generateReport(studentId).
  const downloadUrl = await generateReport(studentId);
  // TODO(PART 5): Mark it "completed" and save the downloadUrl.
  await db.updateReportJob(jobId, {
    status: "completed",
    downloadUrl
  });

  // TODO(PART 5): Catch generation errors, mark the job "failed", and do not crash the worker.

  } catch (error) {
    await db.updateReportJob(jobId, { status: "failed" });
  }
});
