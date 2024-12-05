import { LowDBQueue } from "../LowDBQueue";
import { MailRequestBody } from "../../../types/MailRequest";
import { MailService } from "../../mail.service";

export class EmailQueue extends LowDBQueue<MailRequestBody> {
  private mailService: MailService;
  private WAIT_FOR_NEXT_CHECK_MS = 1000

  constructor(fileName: string) {
    super(fileName);
    this.mailService = MailService.getInstance();
  }


  public async startProcessing(): Promise<void> {
    while (true) {
      const job = await this.getNextJob();
      if (!job) {
        await this.waitForNextCheck();
        continue;
      }

      await this.processJob(job);
    }
  }

  private async getNextJob(): Promise<MailRequestBody | null> {
    await this.db.read();

    const now = new Date();

    const jobIndex = this.db.data!.queue.findIndex(
      (job: MailRequestBody) => !job.delayed_send || new Date(job.delayed_send) <= now
    );

    if (jobIndex === -1) {
      return null;
    }

    const [job] = this.db.data!.queue.splice(jobIndex, 1);
    await this.db.write();
    return job;
  }


  private async processJob(job: MailRequestBody): Promise<void> {
    try {
      await this.mailService.sendMail(job);
      console.log(`Successfully sent email to: ${job.email}`);
    } catch (error) {
      console.error(`Failed to send email to: ${job.email}`, error);
    }
  }


  private async waitForNextCheck(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, this.WAIT_FOR_NEXT_CHECK_MS));
  }
}
