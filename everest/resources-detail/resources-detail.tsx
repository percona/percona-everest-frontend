import React, { ReactNode } from 'react';

export type ResourcesDetailProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
};

export function ResourcesDetail({ children }: ResourcesDetailProps) {
  return (
    <div>
      {children}
    </div>
  );
}
