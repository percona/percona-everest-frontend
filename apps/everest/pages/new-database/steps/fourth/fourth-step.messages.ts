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
export const Messages = {
  externalAccess: 'External Access',
  caption: `
    Exposing your database to the internet poses severe risks, including unauthorized access, data breaches,
    theft of sensitive information, data manipulation, compliance violations, legal consequences, and reputational damage.
    Secure your database with strong controls, encryption, and firewalls. Use secure remote access, regularly back up data, and conduct security audits.
  `,
  enableExternalAccess: 'Enable External Access',
  internetFacing: 'Internet Facing',
  sourceRange: 'Source Range',
  sourceRangePlaceholder:
    'Please insert the single IP address or range using netmask',
};
