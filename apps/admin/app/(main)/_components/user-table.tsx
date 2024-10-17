"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RootState, useAppDispatch } from "@/redux/store";
import { fetchUsers } from "@/redux/userSlice";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const UserTable = () => {
  const dispatch = useAppDispatch();
  const { users, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading.fetchUsers) {
    return (
      <div className="flex items-center justify-center mt-10">
        <Loader2 size={32} className="animate-spin ml-2" />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <p className="text-sm text-center font-light mt-5">No users found.</p>
    );
  }

  return (
    <Table className="p-4 rounded-xl my-5">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <button className="text-blue-600">Edit</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
