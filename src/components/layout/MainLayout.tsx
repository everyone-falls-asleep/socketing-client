import Header from "../templates/header/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Header />
      <main className="h-[calc(100vh-76px)] overflow-y-auto">{children}</main>
    </div>
  );
};

export default MainLayout;
