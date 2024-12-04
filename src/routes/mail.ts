import { Router } from "express";
import { validateSchema } from "../middleware/schemaValidation";
import { MailRequestSchema } from "../schemas/mailSchema";
import { sendMail } from "../controllers/mail.controller";

const mailRouter = Router();
mailRouter.post("/", validateSchema(MailRequestSchema), sendMail);

export default mailRouter;
