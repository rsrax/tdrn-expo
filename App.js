import React from "react";
import { MenuProvider } from "react-native-popup-menu";

import Providers from "./navigation";

export default function App() {
  return (
    <MenuProvider>
      <Providers />
    </MenuProvider>
  );
}
