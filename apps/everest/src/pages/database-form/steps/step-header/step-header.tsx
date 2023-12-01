import { Typography } from '@mui/material';

type StepHeaderProps = {
  pageTitle?: string;
  pageDescription?: string;
};
export const StepHeader = ({ pageTitle, pageDescription }: StepHeaderProps) => {
  return (
    <>
      {pageTitle && (
        <Typography variant="h5" data-testid="step-header">
          {pageTitle}
        </Typography>
      )}
      {pageDescription && (
        <Typography
          data-testid="step-description"
          variant="body2"
          sx={{ mt: 0.5 }}
        >
          {pageDescription}
        </Typography>
      )}
    </>
  );
};
