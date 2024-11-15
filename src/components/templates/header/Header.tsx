import React from "react";
import Button from "../../atoms/buttons/Button";
import { useNavigate } from "react-router-dom";
import Input from "../../atoms/inputs/Input";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
      <a href="/" className="text-2xl font-bold">
        SocKeTing
      </a>
      <div className="flex  items-center w-1/2 bg-white rounded-lg overflow-hidden">
        <Input
          type="text"
          placeholder="검색"
          className="w-full p-2 rounded-r-none text-gray-700 outline-none"
        />
        <button className="p-3 w-[100px] bg-rose-400 rounded-r-lg hover:bg-rose-500">
          🔍
        </button>
      </div>
      <div className="flex space-x-4">
        <Button
          variant="primary"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            navigate("/join");
          }}
        >
          Sign Up
        </Button>
      </div>
    </header>
  );
};

export default Header;
