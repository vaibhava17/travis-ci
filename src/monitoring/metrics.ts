import * as promClient from 'prom-client';

// Initialize the default registry
promClient.collectDefaultMetrics();

// Create custom metrics
export const requestCounter = new promClient.Counter({
  name: 'app_requests_total',
  help: 'Total number of requests',
  labelNames: ['method', 'route', 'status']
});

export const responseTimeHistogram = new promClient.Histogram({
  name: 'app_response_time_seconds',
  help: 'Response time in seconds',
  labelNames: ['method', 'route'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

export const memoryUsageGauge = new promClient.Gauge({
  name: 'app_memory_usage_bytes',
  help: 'Memory usage in bytes',
  collect() {
    const used = process.memoryUsage();
    this.set(used.heapUsed);
  }
});

export const activeConnectionsGauge = new promClient.Gauge({
  name: 'app_active_connections',
  help: 'Number of active connections'
});
