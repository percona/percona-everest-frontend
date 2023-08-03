import { type MaterialReactTableProps } from 'material-react-table';

export interface TableProps<T extends Record<string, any>>
  extends MaterialReactTableProps<T> {
  noDataMessage: string;
  hideExpandAllIcon?: boolean;
}
