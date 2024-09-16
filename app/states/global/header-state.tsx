import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

export interface HeaderState {
  title: string;
}
export const HeaderContext = createContext<{
  header: HeaderState;
  setHeader: Dispatch<SetStateAction<HeaderState>>;
}>({
  header: {
    title: '',
  },
  setHeader: () => {
    throw new Error('Please wrap your component with HeaderContextProvider');
  },
});

export const HeaderContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [header, setHeader] = useState({
    title: '',
  });

  return (
    <HeaderContext value={{ header, setHeader }}>{children}</HeaderContext>
  );
};

export const useHeaderContext = () => {
  return useContext(HeaderContext);
};
