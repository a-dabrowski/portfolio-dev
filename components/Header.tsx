import React from "react";
import Link from "next/link";

export default function Header() {

  const AUTHOR = "Adam Dąbrowski";
  return (
    <>
      <div className="mb-4 bg-black sticky top-0">
        <header className="max-w-3xl m-auto flex flex-row justify-between items-center p-4 text-white">
            <Link className="block text-3xl hover:underline" href="/">
              {AUTHOR}
            </Link>
          <div className="flex flex-row">
            <Link className="block ml-2 hover:underline" href="/">
              Blog
            </Link>
            <Link className="block ml-2 hover:underline" href="/about">
              About
            </Link>
          </div>
        </header>
      </div>
    </>
  );
}
