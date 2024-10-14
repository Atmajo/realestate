"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserById,
  updateUser,
  deleteUser,
  resetSuccess,
  resetError,
} from "@/redux/userSlice"; // Assuming userSlice is in the redux folder
import { RootState, AppDispatch } from "@/redux/store"; // Import RootState and AppDispatch for typed useSelector and useDispatch
import { useParams } from "next/navigation";

const ProfilePage: React.FC = () => {
  const id = useParams().profileId as string;

  const dispatch: AppDispatch = useDispatch();
  const { user, loading, error, success } = useSelector(
    (state: RootState) => state.user
  );

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch]);
  
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      dispatch(updateUser({ ...user, ...formData }));
    }
  };

  const handleDelete = () => {
    if (user?.id) {
      dispatch(deleteUser(user.id));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {loading.fetchUserById ? (
        <p>Loading...</p>
      ) : error.fetchUserById ? (
        <p className="text-red-500">{error.fetchUserById}</p>
      ) : user ? (
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">
              {editMode ? "Edit Profile" : "User Profile"}
            </h1>
            {!editMode && (
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
          <div className="space-y-4">
            {editMode ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Enter email"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded-lg"
                    disabled={loading.updateUser}
                  >
                    {loading.updateUser ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 text-white py-2 px-4 rounded-lg"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </div>
                {error.updateUser && (
                  <p className="text-red-500">{error.updateUser}</p>
                )}
                {success.updateUser && (
                  <p className="text-green-500">
                    Profile updated successfully!
                  </p>
                )}
              </form>
            ) : (
              <div>
                <p className="text-xl">
                  <strong>Name: </strong> {user.name}
                </p>
                <p className="text-xl">
                  <strong>Email: </strong> {user.email}
                </p>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4"
                  disabled={loading.deleteUser}
                >
                  {loading.deleteUser ? "Deleting..." : "Delete Profile"}
                </button>
                {error.deleteUser && (
                  <p className="text-red-500">{error.deleteUser}</p>
                )}
                {success.deleteUser && (
                  <p className="text-green-500">
                    Profile deleted successfully!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProfilePage;
