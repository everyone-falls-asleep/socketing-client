import MainLayout from "../layout/MainLayout";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../store/UserContext";
import UserMainPage from "./UserMainPage";
import AdminPage from "./ManagerMainPage";

function MainPage() {
  const [isManager, setIsManager] = useState(false);
  const { currentRole } = useContext(UserContext);

  const checkIsManager = () => {
    const role = localStorage.getItem("userRole");
    setIsManager(role === "manager");
  };

  useEffect(() => {
    checkIsManager();
  }, [currentRole]);

  return (
    <>
      <MainLayout>{isManager ? <AdminPage /> : <UserMainPage />}</MainLayout>
    </>
  );
}

export default MainPage;
