import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { DbClusterView } from './DbClusterView';
import { useDbClusters } from 'hooks/api/db-clusters/useDbClusters';
import { Mock } from 'vitest';

const queryClient = new QueryClient();

vi.mock('hooks/api/db-clusters/useDbClusters', () => ({
  useDbClusters: vi.fn().mockImplementation(() => ({
    data: [],
    error: true,
  })),
}));

describe('DBClusterView', () => {
  it('should deactivate button when all k8s clusters return errors from API', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <DbClusterView />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByTestId('add-db-cluster-button')).toBeInTheDocument();
    // The component is a Link, so we test by attribute
    expect(
      screen.getByTestId('add-db-cluster-button').getAttribute('aria-disabled')
    ).toBe('true');
  });

  it('should activate button when at least one k8s cluster is ok', () => {
    (useDbClusters as Mock).mockImplementationOnce(() => ({
      data: [],
      error: false,
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <DbClusterView />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByTestId('add-db-cluster-button')).toBeInTheDocument();

    expect(
      screen.getByTestId('add-db-cluster-button').getAttribute('aria-disabled')
    ).toBeNull();
  });
});
