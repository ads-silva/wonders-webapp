import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider/AuthProvider";

interface MainLayoutProps {
  title: string;
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
  const { user, loadMe } = useAuth();

  document.title = `Wonders -${title}`;

  useEffect(() => {
    if (!user) {
      loadMe();
    }
  }, []);

  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default MainLayout;
