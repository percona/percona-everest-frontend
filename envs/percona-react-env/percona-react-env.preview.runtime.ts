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
import { PreviewRuntime } from '@teambit/preview';
import { ReactAspect, ReactPreview } from '@teambit/react';
// uncomment the line below and install the theme if you want to use our theme or create your own and import it here
// import { ThemeCompositions } from '@teambit/documenter.theme.theme-compositions';

import { PerconaReactEnvAspect } from './percona-react-env.aspect';

export class PerconaReactEnvPreviewMain {
  static runtime = PreviewRuntime;

  static dependencies = [ReactAspect];
  // eslint-disable-next-line
  static async provider([react]: [ReactPreview]) {
    const perconaReactEnvPreviewMain = new PerconaReactEnvPreviewMain();
    // uncomment the line below to register a new provider to wrap all compositions using this environment with a custom theme.
    // react.registerProvider([ThemeCompositions]);

    return perconaReactEnvPreviewMain;
  }
}

PerconaReactEnvAspect.addRuntime(PerconaReactEnvPreviewMain);
