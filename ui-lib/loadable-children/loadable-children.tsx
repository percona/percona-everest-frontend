import { Skeleton } from '@mui/material';
import React from 'react';
import { LoadableChildrenProps } from './loadable-children.types';


export const LoadableChildren = ({ children, loading, skeletonProps }: LoadableChildrenProps) => (
  <>
    {
      React.Children.map(children, (child) => (
        loading ? <Skeleton {...skeletonProps} /> : <>{child}</>
      ))
    }
  </>
)