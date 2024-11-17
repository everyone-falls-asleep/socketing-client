import React from "react";

interface LoginTemplateProps {
  loginForm: React.ReactNode;
}

const LoginTemplate = ({ loginForm }: LoginTemplateProps) => {
  return <div className="w-full min-h-[90vh] py-14">{loginForm}</div>;
};

export default LoginTemplate;
