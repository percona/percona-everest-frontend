import { Alert } from '@mui/material';
import { ResourcesDetail } from '@percona/everest.resources-detail';
import React, { useState } from 'react';
import { getStyles } from './resources-details.style';

export function ResourcesDetails() {
  const [inputValue1, setInputValue1] = useState<number>(0);
  const [inputValue2, setInputValue2] = useState<number>(0);
  const [inputValue3, setInputValue3] = useState<number>(0);
  const styles = getStyles();
  const total1 = 10;
  const total2 = 10;
  const total3 = 600;
  const value1Percentage = (inputValue1 / total1) * 100;
  const value2Percentage = (inputValue2 / total2) * 100;
  const value3Percentage = (inputValue3 / total3) * 100;
  return (
    <div className={styles.wrapper}>
      {(value1Percentage > 100 ||
        value2Percentage > 100 ||
        value3Percentage > 100) && (
        <div>
          <Alert severity="warning">Value exceeded</Alert>
        </div>
      )}
      <div className={styles.resources}>
        <ResourcesDetail
          value={1}
          total={total1}
          inputValue={inputValue1}
          setInputValue={setInputValue1}
          label="CPU"
          units="CPU"
        />
        <ResourcesDetail
          value={1}
          total={total2}
          inputValue={inputValue2}
          setInputValue={setInputValue2}
          label="MEMORY"
          units="GB"
        />
        <ResourcesDetail
          value={111}
          total={total3}
          inputValue={inputValue3}
          setInputValue={setInputValue3}
          label="DISK"
          units="GB"
        />
      </div>
      <div className={styles.legend}>Consumed Required Available</div>
    </div>
  );
}
