import { getResourceNames, isCustom } from './second-step.utils';
import { ResourcesFields, ResourceSize } from './second-step.types';
import { DEFAULT_SIZES } from './second-step.const';

describe('Second step utils', () => {
  it('should detect when to switch into custom resource mode', async () => {
    expect(
      isCustom(
        ResourcesFields.cpu,
        DEFAULT_SIZES[ResourceSize.small][ResourcesFields.cpu],
        ResourceSize.small
      )
    ).toBe(false);
    expect(
      isCustom(
        ResourcesFields.cpu,
        DEFAULT_SIZES[ResourceSize.small][ResourcesFields.cpu] + 1,
        ResourceSize.small
      )
    ).toBe(true);
    expect(
      isCustom(
        ResourcesFields.cpu,
        DEFAULT_SIZES[ResourceSize.medium][ResourcesFields.cpu],
        ResourceSize.medium
      )
    ).toBe(false);
    expect(
      isCustom(
        ResourcesFields.cpu,
        DEFAULT_SIZES[ResourceSize.medium][ResourcesFields.cpu] + 3,
        ResourceSize.medium
      )
    ).toBe(true);
    expect(
      isCustom(
        ResourcesFields.cpu,
        DEFAULT_SIZES[ResourceSize.large][ResourcesFields.cpu],
        ResourceSize.large
      )
    ).toBe(false);
    expect(
      isCustom(
        ResourcesFields.cpu,
        DEFAULT_SIZES[ResourceSize.large][ResourcesFields.cpu] + 2,
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
