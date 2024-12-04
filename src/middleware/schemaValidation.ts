import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { STATUS_CODES } from "http";

export function validateSchema(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }));
        res.status(400).json({ error: STATUS_CODES[400], details: errorMessages });
      } else {
        res.status(500).json({ error: STATUS_CODES[500], details: error });
      }
    }
  };
}
