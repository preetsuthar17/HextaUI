import { themes } from "./themes";

export function generateThemeScript(): string {
  const validThemes = themes.map((t) => t.name);

  const themesData: Record<
    string,
    { light: Record<string, string>; dark: Record<string, string> }
  > = {};

  themes.forEach((theme) => {
    themesData[theme.name] = {
      light: theme.light,
      dark: theme.dark,
    };
  });

  const themesJson = JSON.stringify(themesData);
  const validThemesJson = JSON.stringify(validThemes);

  return `!function(){try{const e=${validThemesJson},t=${themesJson},n=localStorage.getItem('hextaui-color-theme');let r=n?n.trim():'default';if(!r||!e.includes(r))r='default';const o=localStorage.getItem('theme');let i=!1;'dark'===o?i=!0:'light'!==o&&(i=window.matchMedia('(prefers-color-scheme: dark)').matches);i?document.documentElement.classList.add('dark'):document.documentElement.classList.remove('dark');const a=t[r];if(a){const e=i?a.dark:a.light;for(const[t,n]of Object.entries(e))document.documentElement.style.setProperty(t,n)}}catch(e){}}();`;
}
