import React, { useEffect, useState } from 'react';
import axios from "axios";

type AuthConfigPayload = {
  auth: {
    web: {
      clientID: string;
      url: string;
    }
  }
}

const fetchAuthConfig = async () => {
  const response = await axios.get<AuthConfigPayload>('/auth-config');

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
    console.log('NO CONFIG STILL');
    return null;
  }

  console.log('CONFIG DONE; RENDER');
  console.log(authConfig);

  return <>{children(authConfig)}</>;
}
