import {create} from 'zustand';

const storedTheme = localStorage.getItem("app-theme") || "forest";
export const useThemeStore = create((set) => ({
    theme: storedTheme, // default theme
    setTheme: (newTheme) => {
        document.body.className = ""; // remove previous classes
        document.body.classList.add(`theme-${newTheme}`);
        set({ theme: newTheme });
    },
}));