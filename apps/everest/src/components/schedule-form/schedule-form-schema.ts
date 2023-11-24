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
import { MAX_SCHEDULE_NAME_LENGTH } from '../../consts.ts';
import { Messages } from './schedule-form.messages.ts';
import { ScheduleFormFields } from './schedule-form.types.ts';
import { rfc_123_schema } from 'utils/common-validation';
import { timeSelectionSchemaObject } from '../time-selection/time-selection-schema.ts';

export const storageLocationScheduleFormSchema = (
  mode: 'dbWizard' | 'scheduledBackups'
) => {
  return {
    [ScheduleFormFields.storageLocation]: z
      .string()
      .or(
        z.object({
          name: z.string(),
        })
      )
      .nullable()
      .superRefine((input, ctx) => {
        // TODO revert next line check after https://jira.percona.com/browse/EVEREST-509
        //  this is a temporary measure, as soon as PostgresSQL is implemented, the StorageLocation check
        //  will become mandatory everywhere and it will be possible to remove the null check at all,
        const checkNullStorage = mode !== 'dbWizard';
        if (
          (!input || typeof input === 'string' || !input.name) &&
          (checkNullStorage ? true : input !== null)
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: Messages.storageLocation.invalidOption,
          });
        }
      }),
  };
};

export const schema = (schedulesNamesList: string[], mode?: 'edit' | 'new') =>
  z.object({
    [ScheduleFormFields.scheduleName]: rfc_123_schema(
      `${Messages.scheduleName.label.toLowerCase()} name`
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
    ...timeSelectionSchemaObject,
    ...storageLocationScheduleFormSchema('scheduledBackups'),
  });

export type ScheduleFormData = z.infer<ReturnType<typeof schema>>;
