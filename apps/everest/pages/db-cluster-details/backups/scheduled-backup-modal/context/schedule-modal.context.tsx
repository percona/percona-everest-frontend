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

import React, { createContext, useState } from 'react';
import { ScheduleModalContextType } from './schedule-modal.context.types';

export const ScheduleModalContext = createContext<ScheduleModalContextType>({
  mode: 'new',
});

export const ScheduleModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<'new' | 'edit'>('new');
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const [selectedScheduleName, setSelectedScheduleName] = useState<string>('');

  return (
    <ScheduleModalContext.Provider
      value={{
        mode,
        setMode,
        openScheduleModal,
        setOpenScheduleModal,
        selectedScheduleName,
        setSelectedScheduleName,
      }}
    >
      {children}
    </ScheduleModalContext.Provider>
  );
};
