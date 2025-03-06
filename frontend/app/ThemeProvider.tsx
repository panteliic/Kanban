"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const lightMode = useSelector((state: RootState) => state.theme.lightMode);

  useEffect(() => {
    if (lightMode) {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [lightMode]);

  return <>{children}</>;
}
