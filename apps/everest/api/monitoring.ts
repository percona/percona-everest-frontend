import { api } from "./api";
import {MonitoringInstanceList} from "../types/monitoring.types";

export const getMonitoringInstancesFn = async () => {
    const response = await api.get<MonitoringInstanceList>('monitoring-instances');
    return response.data;
};

export const createMonitoringInstanceFn = async () => {
    const testPrefix = "test-prefix";
    const data = {
        type: 'pmm',
        name: `${testPrefix}-monitoring-api-key`,
        url: 'http://monitoring',
        pmm: {
            apiKey: '123',
        },
    };
    const response = await api.post(
        `monitoring-instances`,
        data
    );

    return response.data;
};
