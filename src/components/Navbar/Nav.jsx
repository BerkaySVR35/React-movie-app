import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import NavSearchResult from "./NavSearchResult";

export default function Nav({ children }) {
  return (
    <nav className="bg-primary text-white p-2">
      <div className="container">
        <div className="row align-items-center">{children}</div>
      </div>
    </nav>
  );
}
