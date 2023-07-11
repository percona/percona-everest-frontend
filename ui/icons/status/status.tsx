import { useTheme } from '@mui/material';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import React from 'react';

interface StatusIconProps extends SvgIconProps {
  size?: 'large' | 'small';
}

export const ErrorIcon = (props: StatusIconProps) => {
  const theme = useTheme();
  const { size = 'large' } = props;
  const iconWidth = size === 'large' ? '20px' : '16px';

  if (theme.palette.mode === 'light') {
    return (
      <SvgIcon
        sx={{ color: 'transparent', height: '100%', width: iconWidth }}
        viewBox="0 0 20 20"
        {...props}
      >
        <rect width="20" height="20" rx="10" fill="#FFECE9" />
        <mask
          id="mask0_12471_81070"
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="3"
          y="3"
          width="14"
          height="14"
        >
          <rect x="3" y="3" width="14" height="14" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_12471_81070)">
          <path
            d="M10 12.9167C10.1653 12.9167 10.3038 12.8608 10.4156 12.749C10.5274 12.6372 10.5833 12.4986 10.5833 12.3333C10.5833 12.1681 10.5274 12.0295 10.4156 11.9177C10.3038 11.8059 10.1653 11.75 10 11.75C9.83472 11.75 9.69618 11.8059 9.58437 11.9177C9.47257 12.0295 9.41667 12.1681 9.41667 12.3333C9.41667 12.4986 9.47257 12.6372 9.58437 12.749C9.69618 12.8608 9.83472 12.9167 10 12.9167ZM9.41667 10.5833H10.5833V7.08333H9.41667V10.5833ZM7.8125 15.25L4.75 12.1875V7.8125L7.8125 4.75H12.1875L15.25 7.8125V12.1875L12.1875 15.25H7.8125Z"
            fill="#B10810"
          />
        </g>
        <rect
          x="0.5"
          y="0.5"
          width="19"
          height="19"
          rx="9.5"
          stroke="#B10810"
          stroke-opacity="0.2"
        />
      </SvgIcon>
    );
  }
  return (
    <SvgIcon
      sx={{ color: 'transparent', height: '100%', width: iconWidth }}
      viewBox="0 0 20 20"
      {...props}
    >
      <rect width="20" height="20" rx="10" fill="#CC352E" />
      <mask
        id="mask0_12471_81209"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="3"
        y="3"
        width="14"
        height="14"
      >
        <rect x="3" y="3" width="14" height="14" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_12471_81209)">
        <path
          d="M10 12.9167C10.1653 12.9167 10.3038 12.8608 10.4156 12.749C10.5274 12.6372 10.5833 12.4986 10.5833 12.3333C10.5833 12.1681 10.5274 12.0295 10.4156 11.9177C10.3038 11.8059 10.1653 11.75 10 11.75C9.83472 11.75 9.69618 11.8059 9.58437 11.9177C9.47257 12.0295 9.41667 12.1681 9.41667 12.3333C9.41667 12.4986 9.47257 12.6372 9.58437 12.749C9.69618 12.8608 9.83472 12.9167 10 12.9167ZM9.41667 10.5833H10.5833V7.08333H9.41667V10.5833ZM7.8125 15.25L4.75 12.1875V7.8125L7.8125 4.75H12.1875L15.25 7.8125V12.1875L12.1875 15.25H7.8125Z"
          fill="white"
        />
      </g>
    </SvgIcon>
  );
};

export const WarningIcon = (props: StatusIconProps) => {
  const theme = useTheme();
  const { size = 'large' } = props;
  const iconWidth = size === 'large' ? '20px' : '16px';

  if (theme.palette.mode === 'light') {
    return (
      <SvgIcon
        sx={{ color: 'transparent', height: '100%', width: iconWidth }}
        viewBox="0 0 20 20"
        {...props}
      >
        <rect width="20" height="20" rx="10" fill="#FFF2B2" />
        <mask
          id="mask0_12471_81118"
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="3"
          y="3"
          width="14"
          height="14"
        >
          <rect x="3" y="3" width="14" height="14" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_12471_81118)">
          <path
            d="M3.5835 15.25L10.0002 4.16669L16.4168 15.25H3.5835ZM10.0002 13.5C10.1654 13.5 10.304 13.4441 10.4158 13.3323C10.5276 13.2205 10.5835 13.082 10.5835 12.9167C10.5835 12.7514 10.5276 12.6129 10.4158 12.5011C10.304 12.3893 10.1654 12.3334 10.0002 12.3334C9.83489 12.3334 9.69634 12.3893 9.58454 12.5011C9.47273 12.6129 9.41683 12.7514 9.41683 12.9167C9.41683 13.082 9.47273 13.2205 9.58454 13.3323C9.69634 13.4441 9.83489 13.5 10.0002 13.5ZM9.41683 11.75H10.5835V8.83335H9.41683V11.75Z"
            fill="#856E00"
          />
        </g>
        <rect
          x="0.5"
          y="0.5"
          width="19"
          height="19"
          rx="9.5"
          stroke="#856E00"
          stroke-opacity="0.2"
        />
      </SvgIcon>
    );
  }
  return (
    <SvgIcon
      sx={{ color: 'transparent', height: '100%', width: iconWidth }}
      viewBox="0 0 20 20"
      {...props}
    >
      <rect width="20" height="20" rx="10" fill="#F5CC00" />
      <mask
        id="mask0_12471_81213"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="3"
        y="3"
        width="14"
        height="14"
      >
        <rect x="3" y="3" width="14" height="14" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_12471_81213)">
        <path
          d="M3.5835 15.25L10.0002 4.16669L16.4168 15.25H3.5835ZM10.0002 13.5C10.1654 13.5 10.304 13.4441 10.4158 13.3323C10.5276 13.2205 10.5835 13.082 10.5835 12.9167C10.5835 12.7514 10.5276 12.6129 10.4158 12.5011C10.304 12.3893 10.1654 12.3334 10.0002 12.3334C9.83489 12.3334 9.69634 12.3893 9.58454 12.5011C9.47273 12.6129 9.41683 12.7514 9.41683 12.9167C9.41683 13.082 9.47273 13.2205 9.58454 13.3323C9.69634 13.4441 9.83489 13.5 10.0002 13.5ZM9.41683 11.75H10.5835V8.83335H9.41683V11.75Z"
          fill="#665500"
        />
      </g>
    </SvgIcon>
  );
};

export const PendingIcon = (props: StatusIconProps) => {
  const theme = useTheme();
  const { size = 'large' } = props;
  const iconWidth = size === 'large' ? '20px' : '16px';

  if (theme.palette.mode === 'light') {
    return (
      <SvgIcon
        sx={{ color: 'transparent', height: '100%', width: iconWidth }}
        viewBox="0 0 20 20"
        {...props}
      >
        <rect width="20" height="20" rx="10" fill="#FFF2B2" />
        <mask
          id="mask0_12760_77845"
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="3"
          y="3"
          width="14"
          height="14"
        >
          <rect x="3" y="3" width="14" height="14" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_12760_77845)">
          <path
            d="M10.0293 14.6666C8.72655 14.6666 7.61822 14.2146 6.70433 13.3104C5.79044 12.4062 5.3335 11.3028 5.3335 9.99998V9.8979L4.40016 10.8312L3.5835 10.0146L5.91683 7.68123L8.25016 10.0146L7.4335 10.8312L6.50016 9.8979V9.99998C6.50016 10.9722 6.84287 11.7986 7.52829 12.4791C8.21371 13.1597 9.04739 13.5 10.0293 13.5C10.2821 13.5 10.53 13.4708 10.7731 13.4125C11.0161 13.3541 11.2543 13.2666 11.4877 13.15L12.3627 14.025C11.9932 14.2389 11.6141 14.3993 11.2252 14.5062C10.8363 14.6132 10.4377 14.6666 10.0293 14.6666ZM14.0835 12.3187L11.7502 9.9854L12.5668 9.16873L13.5002 10.1021V9.99998C13.5002 9.02776 13.1575 8.20137 12.472 7.52081C11.7866 6.84026 10.9529 6.49998 9.971 6.49998C9.71822 6.49998 9.4703 6.52915 9.22725 6.58748C8.98419 6.64581 8.746 6.73331 8.51266 6.84998L7.63766 5.97498C8.00711 5.76109 8.38627 5.60067 8.77516 5.49373C9.16405 5.38679 9.56266 5.33331 9.971 5.33331C11.2738 5.33331 12.3821 5.7854 13.296 6.68956C14.2099 7.59373 14.6668 8.6972 14.6668 9.99998V10.1021L15.6002 9.16873L16.4168 9.9854L14.0835 12.3187Z"
            fill="#856E00"
          />
        </g>
        <rect
          x="0.5"
          y="0.5"
          width="19"
          height="19"
          rx="9.5"
          stroke="#856E00"
          stroke-opacity="0.2"
        />
      </SvgIcon>
    );
  }
  return (
    <SvgIcon
      sx={{ color: 'transparent', height: '100%', width: iconWidth }}
      viewBox="0 0 20 20"
      {...props}
    >
      <rect width="20" height="20" rx="10" fill="#F5CC00" />
      <mask
        id="mask0_12760_77851"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="3"
        y="3"
        width="14"
        height="14"
      >
        <rect x="3" y="3" width="14" height="14" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_12760_77851)">
        <path
          d="M10.0293 14.6666C8.72655 14.6666 7.61822 14.2146 6.70433 13.3104C5.79044 12.4062 5.3335 11.3028 5.3335 9.99998V9.8979L4.40016 10.8312L3.5835 10.0146L5.91683 7.68123L8.25016 10.0146L7.4335 10.8312L6.50016 9.8979V9.99998C6.50016 10.9722 6.84287 11.7986 7.52829 12.4791C8.21371 13.1597 9.04739 13.5 10.0293 13.5C10.2821 13.5 10.53 13.4708 10.7731 13.4125C11.0161 13.3541 11.2543 13.2666 11.4877 13.15L12.3627 14.025C11.9932 14.2389 11.6141 14.3993 11.2252 14.5062C10.8363 14.6132 10.4377 14.6666 10.0293 14.6666ZM14.0835 12.3187L11.7502 9.9854L12.5668 9.16873L13.5002 10.1021V9.99998C13.5002 9.02776 13.1575 8.20137 12.472 7.52081C11.7866 6.84026 10.9529 6.49998 9.971 6.49998C9.71822 6.49998 9.4703 6.52915 9.22725 6.58748C8.98419 6.64581 8.746 6.73331 8.51266 6.84998L7.63766 5.97498C8.00711 5.76109 8.38627 5.60067 8.77516 5.49373C9.16405 5.38679 9.56266 5.33331 9.971 5.33331C11.2738 5.33331 12.3821 5.7854 13.296 6.68956C14.2099 7.59373 14.6668 8.6972 14.6668 9.99998V10.1021L15.6002 9.16873L16.4168 9.9854L14.0835 12.3187Z"
          fill="#665500"
        />
      </g>
    </SvgIcon>
  );
};
