import React from "react";

const TypingIndicator = () => {
  return (
    <div className="flex py-2">
      <div className="animate-dot1-fall w-2 h-2 bg-gray-600 mr-1 rounded-full"></div>
      <div className="animate-dot2-fall w-2 h-2 bg-gray-600 mr-1 rounded-full"></div>
      <div className="animate-dot3-fall w-2 h-2 bg-gray-600 mr-1 rounded-full"></div>
    </div>
  );
};

export default TypingIndicator;
