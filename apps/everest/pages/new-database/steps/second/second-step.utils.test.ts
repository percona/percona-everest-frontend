// percona-everest-backend
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
import { getResourceNames, isCustom } from './second-step.utils';
import { ResourceSize } from './second-step.types';
import { DEFAULT_SIZES } from './second-step.const';
import { DbWizardFormFields } from '../../new-database.types';

describe('Second step utils', () => {
  it('should detect when to switch into custom resource mode', async () => {
    expect(
      isCustom(
        DbWizardFormFields.cpu,
        DEFAULT_SIZES[ResourceSize.small][DbWizardFormFields.cpu],
        ResourceSize.small
      )
    ).toBe(false);
    expect(
      isCustom(
        DbWizardFormFields.cpu,
        DEFAULT_SIZES[ResourceSize.small][DbWizardFormFields.cpu] + 1,
        ResourceSize.small
      )
    ).toBe(true);
    expect(
      isCustom(
        DbWizardFormFields.cpu,
        DEFAULT_SIZES[ResourceSize.medium][DbWizardFormFields.cpu],
        ResourceSize.medium
      )
    ).toBe(false);
    expect(
      isCustom(
        DbWizardFormFields.cpu,
        DEFAULT_SIZES[ResourceSize.medium][DbWizardFormFields.cpu] + 3,
        ResourceSize.medium
      )
    ).toBe(true);
    expect(
      isCustom(
        DbWizardFormFields.cpu,
        DEFAULT_SIZES[ResourceSize.large][DbWizardFormFields.cpu],
        ResourceSize.large
      )
    ).toBe(false);
    expect(
      isCustom(
        DbWizardFormFields.cpu,
        DEFAULT_SIZES[ResourceSize.large][DbWizardFormFields.cpu] + 2,
        ResourceSize.large
      )
    ).toBe(true);
  });

  it('should show correct alert message', async () => {
    expect(getResourceNames(['CPU', 'memory', 'disk'])).toBe(
      'CPU, memory, and disk'
    );
    expect(getResourceNames(['memory', 'disk'])).toBe('memory and disk');
    expect(getResourceNames(['disk'])).toBe('disk');
  });
});
