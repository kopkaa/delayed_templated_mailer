import { z } from "zod";
import { EmailTemplate } from "../types/EmailTemplate";

export const LinkSchema = z.object({
  label: z.string().min(1, "Link label is required"),
  url: z.string().url("Link URL must be a valid URL"),
});

export const BodyDataSchema = z.object({
  name: z.string().min(1, "Recipient name is required"),
  days: z.number().positive("Days must be a positive number"),
  link: LinkSchema,
});

export const MailRequestSchema = z.object({
  key: z.enum([EmailTemplate.TRIAL_EXPIRES]),
  subject: z.string().min(1, "Email subject is required"),
  delayed_send: z.string().datetime().optional(),
  body_data: BodyDataSchema,
  email: z.array(z.string().email("Invalid email address")).min(1, "At least one email is required"),
  bcc: z.array(z.string().email("Invalid BCC email address")).optional(),
});

