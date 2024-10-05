import React from "react";

const ScreenWrapper = ({ children }: ScreenWrapperProps) => {
  return <div className="px-5 md:px-19 lg:px-32 flex flex-col h-screen z-10">{children}</div>;
};

export default ScreenWrapper;
