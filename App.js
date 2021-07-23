import React from "react";
import { NativeBaseProvider } from "native-base";

import Providers from "./navigation";

export default function App() {
  return (
    <NativeBaseProvider>
      <Providers />
    </NativeBaseProvider>
  );
}
