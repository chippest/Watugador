import { useApp } from "../contexts/AppContext";

export function PageSwitcher({ page }) {
  const { setCurrentPage } = useApp();
  setCurrentPage(page);
}
