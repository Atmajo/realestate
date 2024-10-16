import { fetchBookings } from "@/redux/bookingSlice";
import { fetchProperties } from "@/redux/propertySlice";
import { RootState, useAppDispatch } from "@/redux/store";
import { fetchUsers } from "@/redux/userSlice";
import { Book, HomeIcon, User2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const HomeComponent = () => {
  const dispatch = useAppDispatch();

  const { properties } = useSelector((state: RootState) => state.property);
  const { bookings } = useSelector((state: RootState) => state.booking);
  const { users } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchBookings());
    dispatch(fetchProperties());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="flex justify-between items-center">
      <Link href={"/properties"}>
        <div className="flex justify-center items-center gap-5 w-96 h-32 border-2 border-green-500 rounded-xl">
          <div className="w-14 h-14 flex justify-center items-center bg-green-300/45 rounded-full">
            <HomeIcon className="text-green-600 w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-semibold">{properties.length}</h1>
            <p className="font-light text-gray-400">Properties</p>
          </div>
        </div>
      </Link>
      <Link href={"/books"}>
        <div className="flex justify-center items-center gap-5 w-96 h-32 border-2 border-sky-500 rounded-xl">
          <div className="w-14 h-14 flex justify-center items-center bg-sky-300/45 rounded-full">
            <Book className="text-sky-600 w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-semibold">{bookings.length}</h1>
            <p className="font-light text-gray-400">Bookings</p>
          </div>
        </div>
      </Link>
      <Link href={"/users"}>
        <div className="flex justify-center items-center gap-5 w-96 h-32 border-2 border-purple-500 rounded-xl">
          <div className="w-14 h-14 flex justify-center items-center bg-purple-300/45 rounded-full">
            <User2 className="text-purple-600 w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-semibold">{users.length}</h1>
            <p className="font-light text-gray-400">Users</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HomeComponent;
