import { SvgIconProps } from "@mui/material";
import { BaseStatus } from "./status-field.types";
import { ErrorIcon, PausedIcon, PendingIcon, SuccessIcon, UknownIcon } from "@percona/ui-lib.icons.status";

export const STATUS_TO_ICON: Record<
BaseStatus,
  (props: SvgIconProps) => React.JSX.Element
> = {
  'success': SuccessIcon,
  'error': ErrorIcon,
  'pending': PendingIcon,
  'paused': PausedIcon,
  'unknown': UknownIcon,
};
