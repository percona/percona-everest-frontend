import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeContextProvider } from '@percona/design.theme-context-provider';
import { everestThemeOptions } from '@percona/design.themes.everest';
import { AppBar } from './components/app-bar/AppBar';

export function EverestApp() {
  return (
    <ThemeContextProvider themeOptions={everestThemeOptions}>
      <AppBar />
       {/* header component */}
        <Routes>
          <Route path="/" element={<div>Hello Worldz!!</div>}>
             {/* home page component */}
          </Route>

          <Route path="/about">
             {/* about page component */}
          </Route>

        </Routes>
        {/* footer component */}
    </ThemeContextProvider>
  );
}
