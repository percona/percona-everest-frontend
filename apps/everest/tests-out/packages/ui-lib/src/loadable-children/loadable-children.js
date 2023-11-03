import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { Skeleton } from '@mui/material';
const LoadableChildren = ({ children, loading, skeletonProps, }) => (_jsx(_Fragment, { children: React.Children.map(children, (child) => loading ? _jsx(Skeleton, { ...skeletonProps }) : _jsx(_Fragment, { children: child })) }));
export default LoadableChildren;
//# sourceMappingURL=loadable-children.js.map