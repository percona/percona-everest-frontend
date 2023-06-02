import { useTheme } from '@mui/material';
import { ProgressBar } from '@percona/everest.ui.resources-details.progress-bar';
import { Input } from '@percona/ui.input';
import React from 'react';
import { getStyles } from './resources-detail.style';

export type ResourcesDetailProps = {
  /**
   * a node to be rendered in the special component.
   */
  label: string;
  units: string;
  value: number;
  total: number;
  inputValue: number;
  setInputValue: React.Dispatch<React.SetStateAction<number>>;
};

export function ResourcesDetail({
  label,
  units,
  value,
  total,
  inputValue,
  setInputValue,
}: ResourcesDetailProps) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const value1Percentage = (value / total) * 100;
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{label}</div>
      <div className={styles.input}>
        <Input value={inputValue} setValue={setInputValue} units={units} />
      </div>
      <ProgressBar
        label={`Using ${value} ${units} (${value1Percentage}%) of ${total} ${units} in total`}
        buffer={inputValue}
        value={value}
        total={total}
      />
    </div>
  );
}
