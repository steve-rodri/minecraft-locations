import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Server } from "~/api/servers";

type Context = {
  selected: Server | null;
  setSelected: Dispatch<SetStateAction<Server | null>>;
};

export const ServerContext = createContext<Context>({
  selected: null,
  setSelected: () => {},
});

export const ServerContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selected, setSelected] = useState<Server | null>(null);

  return (
    <ServerContext.Provider
      value={{
        selected,
        setSelected,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export const useServerContext = () => {
  return useContext(ServerContext);
};
