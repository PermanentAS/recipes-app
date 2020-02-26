import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

const Header = () => {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">RecipesApp</NavbarBrand>
    </Navbar>
  );
};

export default Header;
