import React, {useState} from "react";
import ApplicationLogo from "./ApplicationLogo";

const Header = ({children}) => {
  return (
    <div className="flex items-center justify-between">
      {children}
    </div>
  );
};

export default Header;
