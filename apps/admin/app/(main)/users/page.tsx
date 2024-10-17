import React from "react";
import UserTable from "../_components/user-table";

const Page = () => {
  return (
    <section>
      <h1 className="text-3xl font-semibold">Users</h1>
      <UserTable />
    </section>
  );
};

export default Page;
