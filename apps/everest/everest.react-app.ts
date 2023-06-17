import { ReactAppOptions } from '@teambit/react';

const titleAndFaviconModifier = (configMutator) => {
  // These are really hacky, but Bit doesn't seem to properly configure favicon using the "favicon" entry during dev mode
  // Also, no proper way to define the title during build time, other than using "addElementToHtmlTemplate"
  const { raw: { plugins = [] } } = configMutator;

  const htmlWebpackPlugin = plugins.find((p) => p.constructor.name === 'HtmlWebpackPlugin');

  if (htmlWebpackPlugin) {
    htmlWebpackPlugin.userOptions.favicon = require.resolve('./favicon.ico');
  }

  configMutator.removeElementFromHtmlTemplate('<title>everest</title>');
  configMutator.addElementToHtmlTemplate({ parent: 'head', position: 'prepend', tag: 'title', content: 'Percona Everest' });

  return configMutator;
}

export const EverestApp: ReactAppOptions = {
  name: 'everest',
  entry: [require.resolve('./everest.app-root')],
  favicon: require.resolve('./favicon.ico'),
  webpackTransformers: [titleAndFaviconModifier]
};

export default EverestApp;
