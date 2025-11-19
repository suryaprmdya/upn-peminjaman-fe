import React from "react";

const LayoutHeader = ({children, className = ""}) => {
  return (
    <nav
      className={`bg-white/80 backdrop-blur-lg sticky top-0 z-10 shadow-sm w-full ${className}`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">{children}</div>
    </nav>
  );
};

export default LayoutHeader;
