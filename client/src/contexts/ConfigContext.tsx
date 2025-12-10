import React, { createContext, useContext, useEffect, useState } from "react";

type MainLinkType = "video" | "audio" | null;

interface ConfigContextType {
  mainLink: MainLinkType;
  setMainLink: (link: MainLinkType) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [mainLink, setMainLinkState] = useState<MainLinkType>(null);

  useEffect(() => {
    const savedLink = localStorage.getItem("mainLink") as MainLinkType;
    if (savedLink) {
      setMainLinkState(savedLink);
    }
  }, []);

  const setMainLink = (link: MainLinkType) => {
    setMainLinkState(link);
    if (link) {
      localStorage.setItem("mainLink", link);
    } else {
      localStorage.removeItem("mainLink");
    }
  };

  return (
    <ConfigContext.Provider value={{ mainLink, setMainLink }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
}
