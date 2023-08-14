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
import { DbType } from '@percona/ui-lib.db-toggle-card';
import { z } from 'zod';
import { NumberOfNodes, ResourceSize } from './steps/second/second-step.types';
import { Messages } from './database-form.messages';
import { IP_REGEX } from '../../constants';

export enum DbWizardFormFields {
  dbName = 'dbName',
  dbType = 'dbType',
  k8sNamespace = 'k8sNamespace',
  dbEnvironment = 'dbEnvironment',
  dbVersion = 'dbVersion',
  cpu = 'cpu',
  memory = 'memory',
  disk = 'disk',
  numberOfNodes = 'numberOfNodes',
  resourceSizePerNode = 'resourceSizePerNode',
  backupsEnabled = 'backupsEnabled',
  pitrEnabled = 'pitrEnabled',
  pitrTime = 'pitrTime',
  storageLocation = 'storageLocation',
  selectedTime = 'selectedTime',
  minute = 'minute',
  hour = 'hour',
  amPm = 'amPm',
  weekDay = 'weekDay',
  onDay = 'onDay',
  externalAccess = 'externalAccess',
  internetFacing = 'internetFacing',
  sourceRange = 'sourceRange',
  monitoring = 'monitoring',
  endpoint = 'endpoint',
}

// .passthrough tells Zod to not drop unrecognized keys
// this is needed because we parse step by step
// so, by default, Zod would leave behind the keys from previous steps
const stepOneSchema = z
  .object({
    [DbWizardFormFields.dbType]: z.nativeEnum(DbType),
    [DbWizardFormFields.dbName]: z
      .string()
      .max(255, Messages.errors.dbName.tooLong)
      .nonempty(),
    // [DbWizardFormFields.k8sNamespace]: z.string().nonempty(),
    // [DbWizardFormFields.dbEnvironment]: z.string().nonempty(),
    [DbWizardFormFields.dbVersion]: z.string().nonempty(),
  })
  .passthrough();

const stepTwoSchema = z
  .object({
    [DbWizardFormFields.cpu]: z.number(),
    [DbWizardFormFields.memory]: z.number(),
    [DbWizardFormFields.disk]: z.number(),
    [DbWizardFormFields.resourceSizePerNode]: z.nativeEnum(ResourceSize),
    [DbWizardFormFields.numberOfNodes]: z.nativeEnum(NumberOfNodes),
  })
  .passthrough();

// TODO re-add third step after API is ready for backups
// const stepThreeSchema = z
//   .object({
//     backupsEnabled: z.boolean(),
//     // pitrEnabled: z.boolean(),
//     // pitrTime: z.string(),
//     storageLocation:
//       z.string()
//         .or(
//           z.object({
//             id: z.string(),
//             name: z.string(),
//           })
//         )
//         .nullish()
//         .superRefine((input, ctx) => {
//           if (!input || typeof input === 'string' || !input.id || !input.name) {
//             ctx.addIssue({
//               code: z.ZodIssueCode.custom,
//               message: Messages.errors.storageLocation.invalid,
//             });
//           }
//         }),
//     selectedTime: z.nativeEnum(TimeValue),
//     minuteHour: z.number().optional(),
//     minute: z.number().optional(),
//     hour: z.number().optional(),
//     amPm: z.nativeEnum(AmPM).optional(),
//     weekDay: z.nativeEnum(WeekDays).optional(),
//     onDay: z.number().optional(),
//   })
//   .passthrough()

const stepFourSchema = z
  .object({
    externalAccess: z.boolean(),
    // internetFacing: z.boolean(),
    sourceRange: z.string().optional(),
  })
  .passthrough()
  .superRefine((input, ctx) => {
    if (input.sourceRange && IP_REGEX.exec(input.sourceRange) === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_string,
        validation: 'ip',
        path: ['sourceRange'],
        message: Messages.errors.sourceRange.invalid,
      });
    }
  });

// TODO re-add step after API is ready for monitoring
// const stepFiveSchema = z
//   .object({
//     monitoring: z.boolean(),
//     endpoint: z.string().optional(),
//   })
//   .passthrough()
//   .superRefine((input, ctx) => {
//     if (input.monitoring) {
//       const { success } = z.string().url().nonempty().safeParse(input.endpoint);

//       if (!success) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.invalid_string,
//           validation: 'url',
//           path: ['endpoint'],
//           message: Messages.errors.endpoint.invalid,
//         });
//       }
//     }
//   });

// Each position of the array is the validation schema for a given step
// TODO re-add steps after API is ready
export const dbWizardSchema = [
  stepOneSchema,
  stepTwoSchema,
  // stepThreeSchema,
  stepFourSchema,
  // stepFiveSchema,
];

const superset = stepOneSchema
  .and(stepTwoSchema)
  // .and(stepThreeSchema)
  .and(stepFourSchema);
// .and(stepFiveSchema);

export type DbWizardType = z.infer<typeof superset>;

export type DbWizardMode = 'edit' | 'new';