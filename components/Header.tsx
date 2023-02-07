import React, { useState } from "react";
import { Menu, MenuContainer, MenuItem } from "./CurtainMenu";

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const AUTHOR = "Adam Dąbrowski";
  //return <h1>HEADER PLACEHOLDER{AUTHOR}</h1>;
  return (
    <>
      <Menu open={isMenuOpen} transition="top">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          onClick={() => setMenuOpen(false)}
        >
          Close
        </button>
        <MenuContainer>
          <MenuItem href="/">Homepage</MenuItem>
          <MenuItem href="/photography/offer">Photography Services</MenuItem>
          <MenuItem href="/photography">Photography Portfolio</MenuItem>
          <MenuItem href="/">About Me</MenuItem>
        </MenuContainer>
      </Menu>
      <header>
        <h2>{AUTHOR}</h2>
        <button className="uppercase" onClick={() => setMenuOpen(true)}>
          Menu
        </button>
      </header>
    </>
  );
}
