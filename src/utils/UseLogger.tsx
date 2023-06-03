import React, {
  createContext, useCallback, useContext, useMemo,
} from 'react';

type Props = {
    children: React.ReactNode,
}
interface UseLoggerType {
  info: (source: string, message: string) => void,
  warn: (source: string, message: string) => void,
  error: (source: string, message: string, error: Error) => void,
}
const UseLoggerContext = createContext<UseLoggerType>({
  info: () => null,
  warn: () => null,
  error: () => null,
});

const useLogger = () => useContext(UseLoggerContext);
const UseLoggerProvider = ({ children }: Props) => {
  const info = useCallback(
    (
      source: string, message: string,
    ) => {
      console.log(`Logger Service info: Source: ${source}, error: ${message}`);
    }, [],
  );

  const warn = useCallback(
    (
      source: string, message: string,
    ) => {
      console.warn(`Logger Service info: Source: ${source}, error: ${message}`);
    }, [],
  );

  const error = useCallback(
    (
      source: string, message: string, errorObject: Error,
    ) => {
      console.error(`Logger Service info: Source: ${source}, message: ${message} error: ${errorObject.message || JSON.stringify(errorObject)}`);
    }, [],
  );

  const contextValue = useMemo(
    () => ({
      info,
      warn,
      error,
    }), [
      info,
      warn,
      error,
    ],
  );
  return (
    <UseLoggerContext.Provider value={contextValue}>
      {children}
    </UseLoggerContext.Provider>
  );
};
export {
  useLogger,
  UseLoggerProvider,
};

export type { Props };
