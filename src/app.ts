import express, { Request, Response, Router, RequestHandler } from "express";
import metricsRoutes from "./routes/metrics.routes";
import { monitoringMiddleware } from "./middleware/monitoring.middleware";
import { alertManager } from "./monitoring/alerts";

const app: express.Application = express();
const router: Router = express.Router();

app.use(monitoringMiddleware);

// Define the route handler without caching
const handleDataRequest: RequestHandler = async (req, res) => {
  try {
    const data = await heavyComputation();
    res.json(data);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function heavyComputation(): Promise<{ result: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ result: "Computed data" });
    }, 1000);
  });
}

app.use(express.json());
app.use("/metrics", metricsRoutes);

// Apply route handler
router.get("/api/data", handleDataRequest);

// Use the router
app.use(router);
setInterval(() => {
  alertManager.checkRules();
}, 60000); // Check every minute

export default app;
