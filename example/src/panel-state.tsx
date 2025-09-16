import * as React from 'react';

export interface PanelState {
  marginCollapse: boolean;
  setMarginCollapse: (value: boolean) => void;
  debug: boolean;
  setDebug: (value: boolean) => void;
}

export const PanelStateContext = React.createContext<PanelState | undefined>(
  undefined
);

export function PanelStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [marginCollapse, setMarginCollapse] = React.useState(true);
  const [debug, setDebug] = React.useState(true);

  return (
    <PanelStateContext.Provider
      value={{ marginCollapse, setMarginCollapse, debug, setDebug }}
    >
      {children}
    </PanelStateContext.Provider>
  );
}

export function usePanelState() {
  const context = React.useContext(PanelStateContext);
  if (!context) {
    throw new Error('usePanelState must be used within a PanelStateProvider');
  }
  return context;
}
