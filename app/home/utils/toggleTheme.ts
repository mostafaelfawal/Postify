export default function toggleTheme(
  theme: boolean,
  setTheme: (v: boolean) => void
) {
  const htmlElement = document.documentElement;
  htmlElement.classList.toggle("dark");
  setTheme(!theme);
  window.localStorage.setItem("theme", htmlElement.classList[0] || "");
}
