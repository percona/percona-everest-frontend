// /**
//  * customize the bit documentation template or
//  * replace this with one of your own.
//  */

import { DocsRootProps } from '@teambit/docs';
import React, { ReactNode, ComponentType } from 'react';
// @ts-ignore
import ReactDOM from 'react-dom';
import { DocsApp } from '@teambit/react.ui.docs-app';

/**
 * a reference to a provider function.
 */
export type DocsProvider = ComponentType<{ children: ReactNode }>;

function createDocsTemplate(Provider: DocsProvider = React.Fragment) {
  const DocsTemplate = ({
    componentId,
    docs,
    compositions,
    context,
  }: DocsRootProps) => {
    const rootElm = document.getElementById('root');
    ReactDOM.render(
      // @ts-ignore
      <Provider>
        <DocsApp
          componentId={componentId}
          docs={docs}
          compositions={compositions}
          context={context}
        />
        ,
      </Provider>,
      rootElm
    );
  };
  DocsTemplate.apiObject = true;
  return DocsTemplate;
}

export default createDocsTemplate();
