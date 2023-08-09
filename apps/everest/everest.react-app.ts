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
import { ReactAppOptions } from '@teambit/react';

const titleAndFaviconModifier = (configMutator) => {
  // These are really hacky, but Bit doesn't seem to properly configure favicon using the "favicon" entry during dev mode
  // Also, no proper way to define the title during build time, other than using "addElementToHtmlTemplate"
  const {
    raw: { plugins = [] },
  } = configMutator;

  const htmlWebpackPlugin = plugins.find(
    (p) => p.constructor.name === 'HtmlWebpackPlugin'
  );

  if (htmlWebpackPlugin) {
    htmlWebpackPlugin.userOptions.favicon = require.resolve('./favicon.ico');
  }

  configMutator.removeElementFromHtmlTemplate('<title>everest</title>');
  configMutator.addElementToHtmlTemplate({
    parent: 'head',
    position: 'prepend',
    tag: 'title',
    content: 'Percona Everest',
  });

  return configMutator;
};

const proxyModifier = (configMutator) => {
  const apiPort = process.env.API_PORT || '8081';

  const newWebpackConfig = {
    devServer: {
      proxy: {
        '/v1': `http://localhost:${apiPort}`,
      },
    },
  };

  configMutator.merge(newWebpackConfig);

  return configMutator;
};

const outputModifier = (configMutator) => {
  if (configMutator.raw.mode === 'production') {
    configMutator.merge({
      output: {
        filename: 'static/[name].[chunkhash].js',
      },
    });
  }

  return configMutator;
};

export const EverestApp: ReactAppOptions = {
  name: 'everest',
  entry: [require.resolve('./everest.app-root')],
  favicon: require.resolve('./favicon.ico'),
  webpackTransformers: [titleAndFaviconModifier, proxyModifier, outputModifier],
};

export default EverestApp;
