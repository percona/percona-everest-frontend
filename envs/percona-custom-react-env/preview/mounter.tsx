import React, { ComponentType, ReactNode } from 'react';
import ReactDOM from 'react-dom';
// import { createMounter } from '@teambit/react.mounter';

export type MounterProvider = ComponentType<{ children: ReactNode }>;

/**
 * provide your component compositions (preview) with the context they need to run.
 * for example, a router, a theme, a data provider, etc.
 * components added here as providers, should be listed as host-dependencies in your host-dependencies.ts file.
 * @see https://bit.dev/docs/react-env/component-previews#composition-providers
 */
export function MyReactProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function createMounter(Provider: MounterProvider = React.Fragment): any {
  return (Composition: React.ComponentType) => {
    const rootDoc = document.getElementById('root');

    if (!rootDoc) {
      throw new Error('could not find root element');
    }

    /* this template uses react 17 mounting function */
    ReactDOM.render(
      <Provider>
        <Composition />
      </Provider>,
      rootDoc
    );
  };
}

/**
 * the entry for the app (preview runtime) that renders your component previews.
 * use the default template or create your own.
 * @see https://docs/react-env/component-previews#composition-mounter
 */
//@ts-ignore
export default createMounter(MyReactProvider);
