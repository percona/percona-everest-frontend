import React, { createContext } from 'react';
import { KubernetesContextType } from './kubernetes.context.types';
import { useKubernetesClusters } from '../../hooks/kubernetesClusters/useKubernetesClusters';

export const K8Context = createContext<KubernetesContextType>({});

export const K8ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <K8Context.Provider value={{ clusters: useKubernetesClusters() }}>
      {children}
    </K8Context.Provider>
  );
}
