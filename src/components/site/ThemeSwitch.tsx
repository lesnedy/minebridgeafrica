import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export function ThemeSwitch() {
  const { t } = useI18n();
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("mb-theme");
    const active = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(active);
    document.documentElement.classList.toggle("dark", active);
  }, []);
  function toggle() {
    const next = !dark;
    setDark(next);
    localStorage.setItem("mb-theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  }
  return <Button variant="ghost" size="icon" onClick={toggle} aria-label={dark ? t.admin.light : t.admin.dark} title={dark ? t.admin.light : t.admin.dark}>{dark ? <Sun /> : <Moon />}</Button>;
}