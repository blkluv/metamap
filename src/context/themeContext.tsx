import { useState, createContext } from "react";
import { ThemesContext } from "../utils/interfaces";

const INITIAL_STATE: ThemesContext = {
  theme: localStorage.getItem("theme")
    ? JSON.parse(localStorage.getItem("theme") as string)
    : "light",
};

const ThemeContext = createContext(INITIAL_STATE);

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const [themeMode, setThemeMode] = useState<string>(
    localStorage.getItem("theme")
      ? JSON.parse(localStorage.getItem("theme") as string)
      : "light"
  );

  const getPalette = (mode: string) => {
    return mode === "light"
      ? {
          // light mode
          primary: "white",
          divider: "rgb(120,120,126)",
          warning: "rgb(235, 110, 105)",
          blue: "#2196f3",
          green: "yellowgreen",
          background: {
            primary: "rgb(245,240,250)",
            secondary: "rgb(102,178,255)",
            tertiary: "rgb(252,251,255)",
          },
          text: {
            primary: "grey",
            secondary: "white",
            tertiary: "black",
          },
          map: {
            style: "streets",
          },
        }
      : {
          //  dark mode
          primary: "rgb(31,30,43)",
          divider: "rgb(120,120,126)",
          warning: "rgb(235, 110, 105)",
          blue: "#2196f3",
          green: "yellowgreen",
          background: {
            primary: "rgb(35,35,48)",
            secondary: "rgb(31,30,43)",
            tertiary: "rgb(53,51,64)",
          },
          text: {
            primary: "white",
            secondary: "rgb(120,120,126)",
            tertiary: "white",
          },
          map: {
            style: "streets-v2-dark",
          },
        };
  };

  const handleChangeTheme = async () => {
    const mode = themeMode === "light" ? "dark" : "light";
    localStorage.setItem("theme", JSON.stringify(mode));
    setThemeMode(mode);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: themeMode,
        palette: getPalette(themeMode),
        onChangeTheme: handleChangeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
