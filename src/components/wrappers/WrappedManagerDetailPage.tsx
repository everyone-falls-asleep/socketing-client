import ManagerDetailPage from "../pages/ManagerDetailPage";
import { ManagerProvider } from "../../store/ManagerContext";

export const WrappedManagerDetailPage = () => {
  return (
    <ManagerProvider>
      <ManagerDetailPage />
    </ManagerProvider>
  );
};
