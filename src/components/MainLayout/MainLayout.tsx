import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider/AuthProvider";
import { Container } from "@mui/material";
import ResponsiveAppBar from "../ResponsiveAppBar/ResponsiveAppBar";

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
    <Container component="main" maxWidth="lg">
      <ResponsiveAppBar />
      <Container component="main" style={{ marginTop: 100 }}>
        {children}
      </Container>
    </Container>
  );
};

export default MainLayout;
