import { memoryUsageGauge, requestCounter, responseTimeHistogram } from "./metrics";

interface AlertRule {
  name: string;
  condition: () => boolean;
  message: string;
  severity: "info" | "warning" | "critical";
}

class AlertManager {
  private rules: AlertRule[] = [];
  private alerts: Set<string> = new Set();

  addRule(rule: AlertRule) {
    this.rules.push(rule);
  }

  async checkRules() {
    for (const rule of this.rules) {
      if (rule.condition()) {
        if (!this.alerts.has(rule.name)) {
          this.alerts.add(rule.name);
          await this.notifyAlert(rule);
        }
      } else {
        if (this.alerts.has(rule.name)) {
          this.alerts.delete(rule.name);
          await this.notifyResolution(rule);
        }
      }
    }
  }

  private async notifyAlert(rule: AlertRule) {
    console.log(`[ALERT][${rule.severity}] ${rule.name}: ${rule.message}`);
    // Here you would integrate with your preferred notification system
    // e.g., Slack, Email, SMS, etc.
  }

  private async notifyResolution(rule: AlertRule) {
    console.log(`[RESOLVED] ${rule.name}`);
  }
}

export const alertManager = new AlertManager();

alertManager.addRule({
  name: "HighRequestRate",
  condition: () => {
    const value = requestCounter.get().values[0]?.value ?? 0;
    return value > 100;
  },
  message: "Request rate exceeds 100 requests per minute",
  severity: "warning",
});

alertManager.addRule({
  name: "SlowResponseTime",
  condition: () => {
    const value =
      responseTimeHistogram.get().sum / responseTimeHistogram.get().count;
    return value > 1;
  },
  message: "Average response time exceeds 1 second",
  severity: "critical",
});

alertManager.addRule({
  name: "HighMemoryUsage",
  condition: () => {
    const value = memoryUsageGauge.get().values[0]?.value ?? 0;
    return value > 1024 * 1024 * 1024; // 1GB
  },
  message: "Memory usage exceeds 1GB",
  severity: "warning",
});
