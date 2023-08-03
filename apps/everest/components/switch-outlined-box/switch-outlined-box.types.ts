// percona-everest-backend
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
import { Control, UseControllerProps } from 'react-hook-form';
import { FormControlLabelProps, SxProps, Theme } from '@mui/material';

export type SwitchOutlinedBoxProps = {
  control?: Control<any>;
  controllerProps?: UseControllerProps;
  formControlLabelProps?: FormControlLabelProps;
  name: string;
  label?: string;
  labelHeader?: string;
  labelDescription?: string;
  children?: React.ReactNode;
  rootSx?: SxProps<Theme>;
  childrenSx?: SxProps<Theme>;
};
