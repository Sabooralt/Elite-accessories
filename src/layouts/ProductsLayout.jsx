import React, { useEffect, useState } from "react";
import { Heading } from "@chakra-ui/react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

function ProductsLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
export default ProductsLayout;
