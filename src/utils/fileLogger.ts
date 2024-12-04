import fs from 'fs';
import path from 'path';

const logsDir = path.resolve(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const logFilePath = path.join(logsDir, 'http_requests.log');

export const logToFile = (log: string): void => {
  const formattedLog = `${log}\n`;

  fs.appendFile(logFilePath, formattedLog, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });
};
