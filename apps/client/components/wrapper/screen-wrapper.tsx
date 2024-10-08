import React from "react";

const ScreenWrapper = ({ children }: ScreenWrapperProps) => {
  return <div className="px-5 md:px-19 lg:px-32 flex flex-col h-screen absolute top-0 left-0 w-full z-20">{children}</div>;
};

export default ScreenWrapper;
