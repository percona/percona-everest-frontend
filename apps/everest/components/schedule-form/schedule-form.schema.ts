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
import {ScheduleFormFields} from "./schedule-form.types";
import {MAX_RFC_1123_NAME_LENGTH} from "../../constants";
import {Messages} from "./schedule-form.messages";
import {rfc_123_schema} from "../../utils/common-validation";
import {timeSelectionSchema} from "../time-selection/time-selection.schema";

const scheduleSchema = z.object({
    [ScheduleFormFields.scheduleName]: rfc_123_schema('schedule', MAX_RFC_1123_NAME_LENGTH).max(MAX_RFC_1123_NAME_LENGTH, Messages.scheduleName.tooLong),
    [ScheduleFormFields.storageLocation]: z
        .string()
        .or(
            z.object({
                name: z.string(),
            })
        )
        .nullable()
        .superRefine((input, ctx) => {
            if (
                (!input || typeof input === 'string' || !input.name) &&
                input !== null
            ) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message:
                        'Invalid option. Please make sure you added a storage location and select it from the dropdown.',
                });
            }
        }),
})


export const scheduleFormSchema = scheduleSchema.merge(timeSelectionSchema);

export type ScheduleFormData = z.infer<typeof scheduleFormSchema>;
