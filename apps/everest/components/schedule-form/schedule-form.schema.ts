// percona-everest-frontend
// Copyright (C) 2023 Percona LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import z from 'zod';
import { MAX_SCHEDULE_NAME_LENGTH } from '../../constants';
import { Messages } from '../../pages/db-cluster-details/backups/scheduled-backup-modal/scheduled-backup-modal.messages';
import {
  AmPM,
  TimeValue,
  WeekDays,
} from '../time-selection/time-selection.types';
import { ScheduleFormFields } from './schedule-form.types';
import { rfc_123_schema } from '../../utils/common-validation';

export const schema = (schedulesNamesList: string[], mode?: 'edit' | 'new') =>
  z.object({
    [ScheduleFormFields.scheduleName]: rfc_123_schema(
      Messages.scheduleName.label.toLowerCase(),
      MAX_SCHEDULE_NAME_LENGTH
    )
      .nonempty()
      .max(MAX_SCHEDULE_NAME_LENGTH, Messages.scheduleName.tooLong)
      .superRefine((input, ctx) => {
        if (
          mode === 'new' &&
          !!schedulesNamesList.find((item) => item === input)
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: Messages.scheduleName.duplicate,
          });
        }
      }),
    selectedTime: z.nativeEnum(TimeValue),
    minute: z.number().optional(),
    hour: z.number().optional(),
    amPm: z.nativeEnum(AmPM).optional(),
    weekDay: z.nativeEnum(WeekDays).optional(),
    onDay: z.number().optional(),
    [ScheduleFormFields.storageLocation]: z
      .string()
      .or(
        z.object({
          name: z.string(),
        })
      )
      .nullable()
      .superRefine((input, ctx) => {
        if (!input || typeof input === 'string' || !input.name) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              'Invalid option. Please make sure you added a storage location and select it from the dropdown.',
          });
        }
      }),
  });

export type ScheduleFormData = z.infer<ReturnType<typeof schema>>;
