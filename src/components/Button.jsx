import React from "react";

export default function Button({className, value, ...props}) {
  return (
    <button
      className={`group relative  flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md bg-primary hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 transition-colors + ${className}`}
      {...props}>
      {value}
    </button>
  );
}
