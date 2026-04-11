export interface Server {
  id: number;
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  cpuUsage: number;
  memoryUsage: number;
  lastUpdate: Date;
}