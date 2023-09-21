// percona-everest-frontend
// Copyright (C) 2023 Percona LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { zodResolver } from '@hookform/resolvers/zod';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Drawer,
  Stack,
  Step,
  StepLabel,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { DialogTitle } from '@percona/ui-lib.dialog-title';
import { Stepper } from '@percona/ui-lib.stepper';
import React, { useEffect, useMemo, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { Messages } from './database-form.messages';
import {
  DbWizardFormFields,
  dbWizardSchema,
  DbWizardType,
} from './database-form.types';
import { steps } from './steps';

import { useCreateDbCluster } from '../../hooks/api/db-cluster/useCreateDbCluster';
import { useUpdateDbCluster } from '../../hooks/api/db-cluster/useUpdateDbCluster';
import { useSelectedKubernetesCluster } from '../../hooks/api/kubernetesClusters/useSelectedKubernetesCluster';
import { DatabasePreview } from './database-preview/database-preview';
import { RestoreDialog } from './restore-dialog/restore-dialog';
import { SixthStep } from './steps/sixth/sixth-step';
import { useDatabasePageDefaultValues } from './useDatabaseFormDefaultValues';
import { useDatabasePageMode } from './useDatabasePageMode';

export const DatabasePage = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [closeModalIsOpen, setModalIsOpen] = useState(false);
  const [restoreFromBackupModal, setRestoreFromBackupModal] = useState(false);
  const currentValidationSchema = dbWizardSchema[activeStep];
  const { mutate: addDbCluster, isLoading: isCreating } = useCreateDbCluster();
  const { mutate: editDbCluster, isLoading: isUpdating } = useUpdateDbCluster();
  const { id } = useSelectedKubernetesCluster();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const navigate = useNavigate();
  const { state } = useLocation();

  const mode = useDatabasePageMode();
  const { defaultValues, dbClusterData, dbClusterStatus } =
    useDatabasePageDefaultValues(mode);

  const methods = useForm<DbWizardType>({
    mode: 'onChange',
    resolver: zodResolver(currentValidationSchema),
    defaultValues,
  });

  useEffect(() => {
    if (mode === 'edit' || mode === 'restoreFromBackup') {
      methods.reset(defaultValues);
    }
  }, [defaultValues]);

  const firstStep = activeStep === 0;

  const onSubmit: SubmitHandler<DbWizardType> = (data) => {
    if (mode === 'new' || mode === 'restoreFromBackup') {
      addDbCluster(
        {
          dbPayload: data,
          id,
          ...(mode === 'restoreFromBackup' && {
            backupDataSource: {
              dbClusterBackupName: state?.backupName,
            },
          }),
        },
        {
          onSuccess: () => {
            setRestoreFromBackupModal(false);
            setFormSubmitted(true);
          },
        }
      );
    }
    if (mode === 'edit') {
      editDbCluster(
        { k8sClusterId: id, dbPayload: data, dbCluster: dbClusterData },
        {
          onSuccess: () => {
            setFormSubmitted(true);
          },
        }
      );
    }
  };

  const handleNext: React.MouseEventHandler<HTMLButtonElement> = async () => {
    if (activeStep < steps.length - 1) {
      const { formState } = methods;

      let isStepValid;
      if (formState.errors[DbWizardFormFields.disk] && activeStep === 1) {
        isStepValid = false;
      } else {
        isStepValid = await methods.trigger();
      }
      if (isStepValid) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleSectionEdit = (order: number) => setActiveStep(order - 1);

  const handleCancel = () => {
    navigate('/databases');
  };

  const PreviewContent = useMemo(
    () => (
      <DatabasePreview
        activeStep={activeStep}
        onSectionEdit={handleSectionEdit}
        sx={{
          mt: 2,
          ...(!isDesktop && {
            padding: 0,
          }),
        }}
      />
    ),
    [activeStep, isDesktop]
  );

  return formSubmitted ? (
    <SixthStep />
  ) : (
    <>
      <Dialog open={closeModalIsOpen}>
        <DialogTitle onClose={() => setModalIsOpen(false)}>
          {Messages.dialog.title}
        </DialogTitle>
        <DialogContent>
          <Typography>{Messages.dialog.content}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="text"
            onClick={() => setModalIsOpen(false)}
          >
            {Messages.dialog.reject}
          </Button>
          <Button variant="contained" onClick={handleCancel}>
            {Messages.dialog.accept}
          </Button>
        </DialogActions>
      </Dialog>
      <Stepper noConnector activeStep={activeStep} sx={{ marginBottom: 4 }}>
        {steps.map((_, idx) => (
          <Step key={`step-${idx + 1}`}>
            <StepLabel />
          </Step>
        ))}
      </Stepper>
      <FormProvider {...methods}>
        {mode === 'restoreFromBackup' && (
          <RestoreDialog
            open={restoreFromBackupModal}
            setOpen={setRestoreFromBackupModal}
            onSubmit={onSubmit}
          />
        )}
        <Stack direction={isDesktop ? 'row' : 'column'}>
          <form
            style={{ flexGrow: 1 }}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Box>
              {(mode === 'new' ||
                ((mode === 'edit' || mode === 'restoreFromBackup') &&
                  dbClusterStatus === 'success')) &&
                React.createElement(steps[activeStep])}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
              <Button
                type="button"
                startIcon={<ArrowBackIcon />}
                variant="text"
                disabled={firstStep}
                onClick={handleBack}
                sx={{ mr: 1 }}
                data-testid="db-wizard-previous-button"
              >
                {Messages.previous}
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button
                variant="outlined"
                disabled={isCreating || isUpdating}
                data-testid="db-wizard-cancel-button"
                sx={{ mr: 1 }}
                onClick={() => setModalIsOpen(true)}
              >
                {Messages.cancel}
              </Button>
              {activeStep === steps.length - 1 ? (
                mode !== 'restoreFromBackup' ? (
                  <Button
                    onClick={methods.handleSubmit(onSubmit)}
                    variant="contained"
                    disabled={isCreating || isUpdating}
                    data-testid="db-wizard-submit-button"
                  >
                    {mode === 'edit' && Messages.editDatabase}
                    {mode === 'new' && Messages.createDatabase}
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setRestoreFromBackupModal(true);
                    }}
                    disabled={isCreating}
                    variant="contained"
                    data-testid="db-wizard-submit-button"
                  >
                    {Messages.createDatabase}
                  </Button>
                )
              ) : (
                <Button
                  onClick={handleNext}
                  variant="contained"
                  data-testid="db-wizard-continue-button"
                >
                  {Messages.continue}
                </Button>
              )}
            </Box>
          </form>
          {isDesktop ? (
            <Drawer
              variant="permanent"
              anchor="right"
              sx={{
                width: '25%',
                flexShrink: 0,
                ml: 3,
                [`& .MuiDrawer-paper`]: {
                  width: '25%',
                  boxSizing: 'border-box',
                },
              }}
            >
              <Toolbar />
              {PreviewContent}
            </Drawer>
          ) : (
            <>
              <Divider
                orientation="horizontal"
                flexItem
                sx={{
                  // This is a little tweak
                  // We make the divider longer, adding the main padding value
                  // Then, to make it begin before the main padding, we add a negative margin
                  // This way, the divider will cross the whole section
                  width: `calc(100% + ${theme.spacing(4 * 2)})`,
                  ml: -4,
                  mt: 6,
                }}
              />
              {PreviewContent}
            </>
          )}
        </Stack>
      </FormProvider>
    </>
  );
};
