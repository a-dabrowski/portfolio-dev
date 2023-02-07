import React from "react";
import Link from "next/link";

const style = {
  menu: {
    default: `overflow-x-hidden md:overflow-hidden transition-all duration-700 fixed z-10 top-0 left-0 bg-black`,
    transition: {
      left: {
        open: `h-full w-full `,
        close: `w-0 h-full`,
      },
      top: {
        open: `h-full w-full `,
        close: `w-full h-0`,
      },
    },
  },
  container: `relative top-1/4 w-full text-center mt-8`,
  item: `text-3xl text-gray-400 cursor-pointer hover:text-white`,
};

type MenuProps = {
  children: JSX.Element[];
  open: boolean;
  transition: "left" | "top";
};

type MenuContainerProps = {
  children: JSX.Element[];
};

type MenuItemProps = {
  children: React.ReactNode;
  href: string;
};

export const Menu: React.FC<MenuProps> = ({ children, open, transition }) => (
  <div
    className={`${style.menu.default} ${
      open
        ? style.menu.transition[transition].open
        : style.menu.transition[transition].close
    }`}
  >
    {children}
  </div>
);

export function MenuContainer({ children }: MenuContainerProps) {
  return <div className={style.container}>{children}</div>;
}

export function MenuItem({ children, href }: MenuItemProps) {
  return (
    <div className="p-2">
      <Link className={style.item} href={href}>
        {children}
      </Link>
    </div>
  );
}
