import { ReactAppOptions } from '@teambit/react';

export const EverestApp: ReactAppOptions = {
  name: 'everest',
  entry: [require.resolve('./everest.app-root')],
  favicon: require.resolve('./favicon.ico'),
};

export default EverestApp;
