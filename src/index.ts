import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import logger from './middleware/requestLogger'
import mailRoutes from "./routes/mail";
import { EmailQueue } from "./services/queue/email_queue/EmailQueue";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_PREFIX = process.env.API_PREFIX || "/api";


app.use(bodyParser.json());
app.use(logger)


app.use(`${API_PREFIX}/mail`, mailRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


const emailQueue = new EmailQueue('emailQueue.json');
emailQueue.startProcessing();