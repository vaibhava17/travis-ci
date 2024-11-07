import { Request, Response, NextFunction } from "express";
import { requestCounter, responseTimeHistogram } from "../monitoring/metrics";

export function monitoringMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const start = process.hrtime();

  // Track response
  res.on("finish", () => {
    const duration = process.hrtime(start);
    const durationInSeconds = duration[0] + duration[1] / 1e9;

    // Record metrics
    requestCounter.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode,
    });

    responseTimeHistogram.observe(
      {
        method: req.method,
        route: req.route?.path || req.path,
      },
      durationInSeconds
    );
  });

  next();
}
