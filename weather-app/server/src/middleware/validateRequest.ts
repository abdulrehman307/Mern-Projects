import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

/**
 * Returns an Express middleware that validates req.body against a Zod schema.
 * Responds 400 with field-level errors on failure.
 */
export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = (result.error as ZodError).flatten().fieldErrors;
      res.status(400).json({ success: false, error: 'Validation failed', details: errors });
      return;
    }
    req.body = result.data;
    next();
  };
}

/**
 * Returns an Express middleware that validates req.query against a Zod schema.
 */
export function validateQuery<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      const errors = (result.error as ZodError).flatten().fieldErrors;
      res.status(400).json({ success: false, error: 'Invalid query params', details: errors });
      return;
    }
    // Attach parsed/coerced query to request
    (req as Request & { parsedQuery: T }).parsedQuery = result.data;
    next();
  };
}
