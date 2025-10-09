export default function toggleTheme(
  theme: boolean,
  setTheme: (v: boolean) => void
) {
  document.documentElement.classList.toggle("dark");
  setTheme(!theme);
}
