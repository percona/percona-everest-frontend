import { api } from './api';
import { MonitoringInstanceList } from '../types/monitoring.types';

export const getMonitoringInstancesFn = async () => {
  const response = await api.get<MonitoringInstanceList>(
    'monitoring-instances'
  );
  return response.data;
};
