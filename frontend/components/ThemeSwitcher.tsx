"use client";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "@/redux/themeSlice";
import { RootState } from "@/store";
import Image from "next/image";

function ThemeSwitcher() {
  const dispatch = useDispatch();
  const lightMode = useSelector((state: RootState) => state.theme.lightMode);

  return (
    <div className="bg-secondary w-5/6 m-auto flex items-center justify-center gap-4 p-3 rounded-lg shadow-md">
      <Image
        src="/assets/icon-light-theme.svg"
        alt="Light Mode"
        width={24}
        height={24}
        className="cursor-pointer"
      />

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={!lightMode}
          onChange={() => dispatch(toggleTheme())}
        />
        <div className="w-12 h-6 bg-primary rounded-full peer transition-colors"></div>
        <div className="absolute left-1 top-1 w-4 h-4 bg-white peer-checked:translate-x-6 rounded-full transition-transform"></div>
      </label>

      <Image
        src="/assets/icon-dark-theme.svg"
        alt="Dark Mode"
        width={24}
        height={24}
        className="cursor-pointer"
      />
    </div>
  );
}

export default ThemeSwitcher;
