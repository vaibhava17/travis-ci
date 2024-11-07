export interface UserData {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
  }
  
  export interface ServiceMetrics {
    responseTime: number;
    memoryUsage: number;
    timestamp: Date;
  }
  
  export interface CacheConfig {
    ttl: number;
    prefix: string;
  }