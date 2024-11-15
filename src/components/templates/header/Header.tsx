import HeaderItem from "../../atoms/header-item/HeaderItem";
import HeaderAccount from "../../molecules/header-account/HeaderAccount";
import HeaderLogo from "../../molecules/header-logo/HeaderLogo";

const Header = () => {
  return (
    <header className="flex p-3 bg-rose-100 h-24">
      <HeaderLogo className="w-2/12" />
      <HeaderItem className="w-8/12" />
      <HeaderAccount className="w-2/12" />
    </header>
  );
};

export default Header;
