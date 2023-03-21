import React from 'react';
import { render } from '@testing-library/react';
import ContextProvider from '../hooks/ContextProvider';

export default function renderWithProvider(component) {
  return ({
    ...render(
      <ContextProvider>
        {component}
      </ContextProvider>,
    ),
  });
}
