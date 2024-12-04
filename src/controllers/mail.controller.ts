import { Request, Response } from 'express';
import { MailRequestBody } from '../types/MailRequest';
import { LowDBQueue } from '../services/queue/LowDBQueue';

const emailQueue = new LowDBQueue<MailRequestBody>('emailQueue.json');

export const sendMail = async (req: Request<{}, {}, MailRequestBody>, res: Response) => {
  try {
    await emailQueue.enqueue(req.body);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error });
  }
};
