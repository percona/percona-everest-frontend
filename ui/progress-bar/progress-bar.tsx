import { LinearProgress } from '@mui/material';
import React from 'react';
import { getStyles } from './progress-bar.style';

export type ProgressBarProps = {
  /**
   * a node to be rendered in the special component.
   */
  value: number;
  buffer: number;
  total: number;
  label: string;
};

export function ProgressBar({ value, buffer, total, label }: ProgressBarProps) {
  const styles = getStyles();

  const value1Percentage = (value / total) * 100;
  const value2Percentage = (buffer / total) * 100;
  const isOverLimit = value2Percentage > 100;
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{label}</div>
      <LinearProgress
        variant="buffer"
        value={value1Percentage}
        valueBuffer={value2Percentage}
        sx={(theme) => ({
          '&': {
            padding: '4px',
            backgroundColor: theme.palette.action.selected,
            borderRadius: '32px',
          },
          '& .MuiLinearProgress-bar': {
            margin: '1.6px',
            borderRadius: '32px',
          },
          '& .MuiLinearProgress-dashed': {
            display: 'none',
          },
          '& .MuiLinearProgress-bar1Buffer': {
            display: isOverLimit ? 'none' : 'block',
          },
          '& .MuiLinearProgress-bar2Buffer': {
            backgroundColor: isOverLimit
              ? theme.palette.warning.main
              : theme.palette.primary.contrastText,
            transform: isOverLimit ? 'none !important' : undefined,
          },
        })}
      />
    </div>
  );
}
