import { z } from 'zod';
import { MonitoringInstance } from 'shared-types/monitoring.types';
import { rfc_123_schema } from 'utils/common-validation';

export enum EndpointFormFields {
  name = 'name',
  url = 'url',
  user = 'user',
  password = 'password',
  apiKey = 'apiKey',
}

export interface CreateEditEndpointModalProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (data: EndpointFormType) => void;
  selectedEndpoint?: MonitoringInstance;
  isLoading?: boolean;
}

export const endpointSchema = z.object({
  [EndpointFormFields.name]: rfc_123_schema('endpoint name'),
  [EndpointFormFields.url]: z.string().min(1).url(),
  [EndpointFormFields.user]: z.string().min(1),
  [EndpointFormFields.password]: z.string().min(1),
  [EndpointFormFields.apiKey]: z.string().min(1),
});

export const endpointDefaultValues = {
  [EndpointFormFields.name]: '',
  [EndpointFormFields.url]: '',
  [EndpointFormFields.user]: '',
  [EndpointFormFields.password]: '',
  [EndpointFormFields.apiKey]: '',
};

export type EndpointFormType = z.infer<typeof endpointSchema>;
