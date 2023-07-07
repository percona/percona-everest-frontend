import { kebabize } from './string';

it('should kebabize', () => {
  expect(kebabize('firstName')).toBe('first-name');
  expect(kebabize('FirstName')).toBe('first-name');
  expect(kebabize('FIRSTNAME')).toBe('first-name');
  expect(kebabize('Firstname')).toBe('first-name');
});
