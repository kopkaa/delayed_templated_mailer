import nodemailer from "nodemailer";
import { compileTemplate } from "../utils/template";
import { MailRequestBody } from "..//types/MailRequest";

export class MailService {
  private static instance: MailService | null = null;
  private transporter;

  private constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT as number | undefined,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  public static getInstance(): MailService {
    if (!this.instance) {
      this.instance = new MailService();
    }
    return this.instance;
  }

  public async sendMail(data: MailRequestBody): Promise<void> {
    const html = compileTemplate(data.key, data.body_data);
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: data.email,
      subject: data.subject,
      html,
    });
  }
}
