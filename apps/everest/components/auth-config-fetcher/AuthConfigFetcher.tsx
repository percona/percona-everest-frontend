import React, { useEffect, useState } from 'react';
import axios from "axios";

type AuthConfigPayload = {
  auth: {
    web: {
      clientID: string;
      url: string;
      issuer: string;
    }
  }
}

const fetchAuthConfig = async () => {
  const response = await axios.get<AuthConfigPayload>('/v1/public/configuration');

  return response.data;
}

const promise = fetchAuthConfig();

export const AuthConfigFetcher = ({ children }: { children: (config: AuthConfigPayload) => React.ReactNode }) => {
  const [authConfig, setAuthConfig] = useState<AuthConfigPayload | null>(null);

  useEffect(() => {
    const load = async () => {
      const authConfig = await promise;
      setAuthConfig(authConfig);
    }

    load();
  }, []);

  if (authConfig === null) {
    return null;
  }

  return <>{children(authConfig)}</>;
}
