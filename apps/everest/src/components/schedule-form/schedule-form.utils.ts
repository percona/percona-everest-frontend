import { Schedule } from '../../types/dbCluster.types';

export const checkUniquenessOfScheduleName = (
  schedules: Schedule[],
  scheduleName: string
) => {
  const duplicate = schedules.find((item) => item?.name === scheduleName);
  return !!duplicate;
};
