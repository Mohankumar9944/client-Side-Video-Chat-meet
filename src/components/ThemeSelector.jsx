import { PaletteIcon } from "lucide-react"
import { useThemeStore } from "../store/useThemeStore"
import { THEMES } from "../constants/index";
import { useState } from "react";
import '../componentStyles/ThemeSelector.css';

const ThemeSelector = () => {

  const [isOpen, setIsOpen] = useState(false);
  const {theme, setTheme} = useThemeStore();
  return (
    <>
      <div className="theme-selector">
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <PaletteIcon />
        </button>
        {isOpen && (
            <div className="theme-dropdown">
            {THEMES.map((themeOption) => (
                <button
                key={themeOption.name}
                className={`theme-button ${theme === themeOption.name ? "active" : ""}`}
                onClick={() => {
                    setTheme(themeOption.name);
                    setIsOpen(false);
                }}
                >
                <PaletteIcon />
                <span>{themeOption.label}</span>
                <div className="color-preview">
                    {themeOption.colors.map((color, i) => (
                    <span key={i} className="color-circle" style={{ backgroundColor: color }} />
                    ))}
                </div>
                </button>
            ))}
            </div>
        )}
      </div>
    </>
  )
}

export default ThemeSelector