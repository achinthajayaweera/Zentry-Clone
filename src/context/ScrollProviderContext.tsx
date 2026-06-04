import React, { createContext } from "react";
import useLocoScroll from "../hooks/useLocoScroll";

// Context shape: exposes the Locomotive Scroll instance and the current Y progress
export const SmoothScrollContext = createContext<{
  locoScroll: LocomotiveScroll | null;
  progress: number;
}>({
  locoScroll: null,
  progress: 0,
});

// Provider: initialises the scroll hook and passes values down the tree
export const SmoothScrollProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { locoScroll, progress } = useLocoScroll();

  return (
    <SmoothScrollContext.Provider value={{ locoScroll, progress }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

// Convenience hook so any component can access scroll context without importing the context object
export const useSmoothScroll = () => React.useContext(SmoothScrollContext);

SmoothScrollContext.displayName = "SmoothScrollContext";
SmoothScrollProvider.displayName = "SmoothScrollProvider";
