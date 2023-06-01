import { ReactAppOptions } from '@teambit/react';

export const EverestApp: ReactAppOptions = {
  name: 'everest',
  entry: [require.resolve('./everest.app-root')]
};

export default EverestApp;
