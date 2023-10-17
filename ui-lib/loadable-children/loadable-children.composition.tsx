import React from 'react';
import { LoadableChildren } from './loadable-children';

export const Loading = () => {
  return <LoadableChildren loading>Content</LoadableChildren>;
};

export const Active = () => {
  return <LoadableChildren>Content</LoadableChildren>;
};
