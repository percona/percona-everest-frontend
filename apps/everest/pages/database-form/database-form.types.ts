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
// import {
//   AmPM,
//   TimeValue,
//   WeekDays,
// } from '../../components/time-selection/time-selection.types';
import { IP_REGEX } from '../../constants';
import { Messages } from './database-form.messages';
import { NumberOfNodes, ResourceSize } from './steps/second/second-step.types';

export enum DbWizardFormFields {
  dbName = 'dbName',
  dbType = 'dbType',
  k8sNamespace = 'k8sNamespace',
  dbEnvironment = 'dbEnvironment',
  dbVersion = 'dbVersion',
  storageClass = 'storageClass',
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
  sourceRanges = 'sourceRanges',
  engineParametersEnabled = 'engineParametersEnabled',
  engineParameters = 'engineParameters',
  monitoring = 'monitoring',
  monitoringInstance = 'monitoringInstance',
  endpoint = 'endpoint',
}

// .passthrough tells Zod to not drop unrecognized keys
// this is needed because we parse step by step
// so, by default, Zod would leave behind the keys from previous steps

const doesNotContainerAnythingButAlphanumericAndDash = /^[a-z0-9-]+$/;
const doesNotStartWithDash = /^[^-]/;
const doesNotEndWithDash = /[^-]$/;

const stepOneSchema = z
  .object({
    [DbWizardFormFields.dbType]: z.nativeEnum(DbType),
    [DbWizardFormFields.dbName]: z
      .string()
      .max(22, Messages.errors.dbName.tooLong)
        .regex(doesNotContainerAnythingButAlphanumericAndDash, 'The name should contain only lowercase alphanumeric characters or -')
        .regex(doesNotEndWithDash, 'The name shouldn\'t end with -')
        .regex(doesNotStartWithDash, 'The name shouldn\'t start with -')
        .trim()
      .nonempty(),
    // [DbWizardFormFields.k8sNamespace]: z.string().nonempty(),
    // [DbWizardFormFields.dbEnvironment]: z.string().nonempty(),
    [DbWizardFormFields.dbVersion]: z.string().nonempty(),
    [DbWizardFormFields.storageClass]: z
      .string()
      .nullable()
      .superRefine((input, ctx) => {
        if (!input) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: Messages.errors.storageClass.invalid,
          });
        }
      }),
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

// const stepThreeSchema = z
//   .object({
//     backupsEnabled: z.boolean(),
//     // pitrEnabled: z.boolean(),
//     // pitrTime: z.string(),
//     storageLocation: z
//       .string()
//       .or(
//         z.object({
//           name: z.string(),
//         })
//       )
//       .nullable()
//       .superRefine((input, ctx) => {
//         if (
//           (!input || typeof input === 'string' || !input.name) &&
//           input !== null
//         ) {
//           ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: Messages.errors.storageLocation.invalid,
//           });
//         }
//       }),
//     selectedTime: z.nativeEnum(TimeValue),
//     minuteHour: z.number().optional(),
//     minute: z.number().optional(),
//     hour: z.number().optional(),
//     amPm: z.nativeEnum(AmPM).optional(),
//     weekDay: z.nativeEnum(WeekDays).optional(),
//     onDay: z.number().optional(),
//   })
//   .passthrough()
//   .superRefine(({ backupsEnabled, storageLocation }, ctx) => {
//     if (backupsEnabled && !storageLocation) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: [DbWizardFormFields.storageLocation],
//         message: Messages.errors.storageLocation.invalid,
//       });
//     }
//   });

const advancedConfigurationsSchema = z
  .object({
    [DbWizardFormFields.externalAccess]: z.boolean(),
    // internetFacing: z.boolean(),
    [DbWizardFormFields.sourceRanges]: z.array(
      z.object({ sourceRange: z.string().optional() })
    ),
    [DbWizardFormFields.engineParametersEnabled]: z.boolean(),
    [DbWizardFormFields.engineParameters]: z.string().optional(),
  })
  .passthrough()
  .superRefine(({ sourceRanges }, ctx) => {
    sourceRanges.forEach(({ sourceRange }, index) => {
      if (sourceRange && IP_REGEX.exec(sourceRange) === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_string,
          validation: 'ip',
          path: [DbWizardFormFields.sourceRanges, index, 'sourceRange'],
          message: Messages.errors.sourceRange.invalid,
        });
      }
    });
  });

const stepFiveSchema = z
  .object({
    monitoring: z.boolean(),
    monitoringInstance: z
      .string()
      .or(
        z.object({
          type: z.string().optional(),
          url: z.string().optional(),
          name: z.string().optional(),
        })
      )
      .nullable(),
  })
  .passthrough();

// Each position of the array is the validation schema for a given step
// TODO re-add steps after API is ready
export const dbWizardSchema = [
  stepOneSchema,
  stepTwoSchema,
  // stepThreeSchema,
  advancedConfigurationsSchema,
  stepFiveSchema,
];

const superset = stepOneSchema
  .and(stepTwoSchema)
  // .and(stepThreeSchema)
  .and(advancedConfigurationsSchema)
  .and(stepFiveSchema);

export type DbWizardType = z.infer<typeof superset>;

export type DbWizardMode = 'edit' | 'new' | 'restoreFromBackup';
