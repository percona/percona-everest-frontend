import React from 'react';
import { render, screen } from '@testing-library/react';
import {HorizontalStepperWithConnectors, StepperWithoutConnectors} from './stepper.composition';


describe('Stepper', () => {
  it('should not show the connector line when noConnector prop is true', () => {
    const {container} = render(<StepperWithoutConnectors/>);
    expect(container.getElementsByClassName('MuiStepConnector-root')[0]).toBeUndefined();
  })
  it('should show the connector line when noConnector prop is false', () => {
    const {container} = render(<HorizontalStepperWithConnectors/>);
    console.log(container.getElementsByClassName('MuiStepConnector-root')[0]);
    expect(container.getElementsByClassName('MuiStepConnector-root')[0]).toBeTruthy();
  })
});
