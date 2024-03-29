import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../AdminPages/components/AdminSidebar";
import Header from "../AdminPages/components/AdminHeader";

import { Box, useBreakpointValue } from "@chakra-ui/react";

// Assuming AdminSidebar component

const smVariant = { navigation: "drawer", navigationButton: true };
const mdVariant = { navigation: "sidebar", navigationButton: false };

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const variants = useBreakpointValue({
    base: smVariant,
    md: smVariant,
    lg: smVariant,
    xl: smVariant,
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Optional: Close sidebar on screen resize (for improved user experience)
  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
    
      <AdminSidebar
        variant={variants?.navigation}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
      />
      <Box ml={!variants?.navigationButton && 200}>
        <Header
          showSidebarButton={variants?.navigationButton}
          onShowSidebar={toggleSidebar}
        />
      </Box>

      <Outlet />
    </>
  );
}
