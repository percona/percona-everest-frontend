import { Typography } from '@mui/material';

type StepHeaderProps = {
  pageTitle?: string;
  pageDescription?: string;
};
export const StepHeader = ({ pageTitle, pageDescription }: StepHeaderProps) => {
  return (
    <>
      {pageTitle && <Typography variant="h5">{pageTitle}</Typography>}
      {pageDescription && (
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          {pageDescription}
        </Typography>
      )}
    </>
  );
};
