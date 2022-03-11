import React from "react";

export const AppCardContext = React.createContext(null);
export const useAppCardContext = () => React.useContext(AppCardContext);
