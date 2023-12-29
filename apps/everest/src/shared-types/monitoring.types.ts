export interface MonitoringInstance {
  type: string;
  url: string;
  name: string;
}

export type MonitoringInstanceList = MonitoringInstance[];

export type CreateMonitoringInstancePayload = MonitoringInstance & {
  pmm: {
    user: string;
    password: string;
    apiKey: string;
  };
};
