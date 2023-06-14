export const generateShortUID = (): string => {
  // eslint-disable-next-line no-bitwise
  const firstPart = `000${((Math.random() * 46656) | 0).toString(36)}`.slice(
    -3
  );
  // eslint-disable-next-line no-bitwise
  const secondPart = `000${((Math.random() * 46656) | 0).toString(36)}`.slice(
    -3
  );
  return firstPart + secondPart;
};
