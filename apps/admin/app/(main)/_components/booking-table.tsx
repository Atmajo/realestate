"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RootState, useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Loader2, Trash } from "lucide-react";
import {
  deleteBooking,
  fetchBookings,
  Status,
  updateBooking,
} from "@/redux/bookingSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 9;

const BookingTable = () => {
  const dispatch = useAppDispatch();
  const { bookings, loading, error } = useSelector(
    (state: RootState) => state.booking
  );
  const [localBookings, setLocalBookings] = useState(bookings);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  useEffect(() => {
    setLocalBookings(bookings);
  }, [bookings]);

  const getStatusColor = (status: Status) => {
    switch (status) {
      case Status.CONFIRMED:
        return "bg-green-100 text-green-600";
      case Status.PENDING:
        return "bg-yellow-200/40 text-orange-500";
      case Status.CANCELLED:
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray text-gray";
    }
  };

  async function handleDelete(id: string) {
    dispatch(deleteBooking(id)).then((action) => {
      if (deleteBooking.fulfilled.match(action)) {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload as string);
      }
    });
  }

  const handleStatusChange = (id: string, newStatus: Status) => {
    setLocalBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );

    dispatch(updateBooking({ id, status: newStatus })).then((action) => {
      if (updateBooking.fulfilled.match(action)) {
        toast.success("Booking status updated successfully");
      } else if (updateBooking.rejected.match(action)) {
        toast.error(
          (action.payload as string) || "Failed to update booking status"
        );
        setLocalBookings(bookings);
      }
    });
  };

  if (loading.fetchBookings) {
    return (
      <div className="flex items-center justify-center mt-10">
        <Loader2 size={32} className="animate-spin ml-2" />
      </div>
    );
  }

  if (localBookings.length === 0) {
    return (
      <p className="text-sm text-center font-light mt-5">No bookings found.</p>
    );
  }

  const totalPages = Math.ceil(localBookings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBookings = localBookings.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-200px)]">
      <div className="flex-grow overflow-auto">
        <Table className="relative">
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.name}</TableCell>
                <TableCell>{booking.email}</TableCell>
                <TableCell>{booking.phone}</TableCell>
                <TableCell>
                  <Select
                    value={booking.status}
                    onValueChange={(value) =>
                      handleStatusChange(booking.id, value as Status)
                    }
                    disabled={loading.updateBooking}
                  >
                    <SelectTrigger
                      className={`w-full ${getStatusColor(booking.status as Status)}`}
                    >
                      <SelectValue>{booking.status}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(Status).map((statusOption) => (
                        <SelectItem key={statusOption} value={statusOption}>
                          {statusOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="flex justify-center items-center gap-2 w-max">
                  <button
                    className="flex justify-center items-center bg-orange-300 w-8 h-8 rounded-lg"
                    onClick={() => handleDelete(booking.id)}
                    disabled={loading.deleteBooking}
                  >
                    {loading.deleteBooking ? (
                      <Loader2
                        size={24}
                        className="animate-spin text-orange-600"
                      />
                    ) : (
                      <Trash size={24} className="text-orange-600" />
                    )}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 sticky bottom-0 bg-white pt-4 pb-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                isActive={currentPage === 1}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setCurrentPage(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                isActive={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default BookingTable;
