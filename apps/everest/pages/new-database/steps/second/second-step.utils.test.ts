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
