import { z } from "zod";
import { MailRequestSchema } from "../schemas/mailSchema";
export type MailRequestBody = z.infer<typeof MailRequestSchema>;