import { api } from './api';
import {
  CreateMonitoringInstancePayload,
  MonitoringInstanceList,
} from 'shared-types/monitoring.types';

export const getMonitoringInstancesFn = async () => {
  const response = await api.get<MonitoringInstanceList>(
    'monitoring-instances'
  );
  return response.data;
};

export const createMonitoringInstanceFn = async (
  payload: CreateMonitoringInstancePayload
) => {
  const response = await api.post('monitoring-instances', payload);

  return response.data;
};
