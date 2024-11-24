import MainLayout from "../layout/MainLayout";
import { useState, useEffect } from "react";
import UserMainPage from "./UserMainPage";
import AdminPage from "./ManagerMainPage";

function MainPage() {
  const [isManager, setIsManager] = useState(false);

  const checkIsManager = () => {
    const role = localStorage.getItem("userRole");
    if (role === "manager") {
      setIsManager(true);
    } else {
      setIsManager(false);
    }
  };

  useEffect(() => {
    checkIsManager();
  }, []);

  return (
    <>
      <MainLayout>{isManager ? <AdminPage /> : <UserMainPage />}</MainLayout>
    </>
  );
}

export default MainPage;
