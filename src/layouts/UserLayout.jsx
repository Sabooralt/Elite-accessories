import React, { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";

function UserLayout() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return <div>{isMounted && <Outlet />}</div>;
}
export default UserLayout;
