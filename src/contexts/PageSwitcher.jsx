import { useApp } from "./AppContext";

export function PageSwitcher({ page }) {
  const { setCurrentPage } = useApp();
  setCurrentPage(page);
}
