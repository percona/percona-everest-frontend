import React from 'react';
import { render, screen } from '@testing-library/react';
import { DbToggleCard } from '../db-toggle-card/db-toggle-card';
import { DbType } from '../db-toggle-card/db-toggle-card.types';

describe('Stepper', () => {
    it('Should not show the connector line when noConnector prop is true', () => {
        //TODO fix
        render(<DbToggleCard value={DbType.Mongo} />);
        expect(screen.getByText('MongoDB')).toBeInTheDocument();
        expect(screen.getByTestId('mongodb-toggle-button')).toBeInTheDocument();
    });
});

// describe('Stepper', () => {
//   it('should not show the connector line when noConnector prop is true', () => {
//     render(
//       <div>
//         {/*<Stepper noConnector dataTestId="noConnector">*/}
//         {/*  {steps.map((label, index) => {*/}
//         {/*    const stepProps: { completed?: boolean } = {};*/}
//         {/*    return (*/}
//         {/*      <Step key={`${label}_${index}`} {...stepProps}>*/}
//         {/*        <StepLabel />*/}
//         {/*      </Step>*/}
//         {/*    );*/}
//         {/*  })}*/}
//         {/*</Stepper>*/}
//       </div>
//     );
//   });
//   expect(screen.getByTestId('noConnector-stepper')).toBeInTheDocument();
// });
