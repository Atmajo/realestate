import React from "react";
import BookingTable from "../_components/booking-table";

const Page = () => {
  return (
    <section className="h-full">
      <h1 className="text-3xl font-semibold">Bookings</h1>
      <div className="">
        <BookingTable />
      </div>
    </section>
  );
};

export default Page;
