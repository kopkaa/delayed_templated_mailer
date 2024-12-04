import { Request, Response, NextFunction } from 'express';
import { logToFile } from '../utils/fileLogger';

export const requestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { method, url, ip, headers, query, body } = req;

  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;

    const logEntry = {
      date: new Date().toISOString(),
      method,
      url,
      ip,
      status: res.statusCode,
      duration: `${duration}ms`,
      headers: {
        host: headers['host'],
        userAgent: headers['user-agent'],
      },
      query,
      body,
    };
    
    logToFile(JSON.stringify(logEntry, null, 2));
  });

  next();
};

export default requestLoggerMiddleware;
