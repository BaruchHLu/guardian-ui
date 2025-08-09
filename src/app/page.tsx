"use client";
import React, { useEffect, useState } from "react";
import UserList from "./useList";
import UserDetails, { User } from "./UserDetails";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  // Fetch users list
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:4000/users?page=${page}&pageSize=2`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        setUsers(data.users);
        setNextPage(data.nextPage);
        setPrevPage(data.prevPage);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [page]);

  // Fetch selected user details
  useEffect(() => {
    if (selectedId == null) {
      setSelectedUser(null);
      return;
    }
    setDetailsLoading(true);
    setDetailsError(null);
    fetch(`http://localhost:4000/users/${selectedId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user details");
        return res.json();
      })
      .then((data) => {
        setSelectedUser(data);
        setDetailsLoading(false);
      })
      .catch((err) => {
        setDetailsError(err.message);
        setDetailsLoading(false);
      });
  }, [selectedId]);

  // Update user
  const handleUpdate = (id: number, name: string) => {
    fetch(`http://localhost:4000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update user");
        return res.json();
      })
      .then((data) => {
        setSelectedUser(data);
        // Refresh user list
        setUsers(users => users.map(u => u.id === id ? data : u));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // Delete user
  const handleDelete = (id: number) => {
    fetch(`http://localhost:4000/users/${id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete user");
        // Remove from list
        setUsers(users => users.filter(u => u.id !== id));
        setSelectedUser(null);
        setSelectedId(null);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full p-4 md:p-24">
      <UserList
        users={users}
        loading={loading}
        error={error}
        onSelect={setSelectedId}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
        setPage={setPage}
      />
      {detailsLoading ? (
        <div className="bg-gray-100 p-4 rounded-md">Loading...</div>
      ) : detailsError ? (
        <div className="bg-gray-100 p-4 rounded-md text-red-500">{detailsError}</div>
      ) : (
        <UserDetails user={selectedUser} onUpdate={handleUpdate} onDelete={handleDelete} />
      )}
    </div>
  );
}