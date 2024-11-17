import Header from "../templates/header/Header";
import Footer from "../templates/footer/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  showAuthButtons?: boolean;
}

const MainLayout = ({ children, showAuthButtons = true }: MainLayoutProps) => {
  return (
    <div>
      <Header showAuthButtons={showAuthButtons} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
