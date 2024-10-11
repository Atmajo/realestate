import React from "react";

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <main className="mt-20 py-5 px-5 w-screen h-screen">
      <div className="bg-white rounded-lg h-full p-4">{children}</div>
    </main>
  );
};

export default Wrapper;
