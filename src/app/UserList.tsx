"use client";
import React from "react";
import type { User } from "./UserDetails";

interface UserListProps {
    users: User[];
    loading: boolean;
    error: string | null;
    onSelect: (id: number) => void;
    page: number;
    nextPage: number | null;
    prevPage: number | null;
    setPage: (page: number) => void;
}

export default function UserList({ users, loading, error, onSelect, page, nextPage, prevPage, setPage }: UserListProps) {
    return (
        <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="font-bold mb-2">User List (Paginated)</h2>
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
            <ul className="mb-4">
                {users.map((user) => (
                    <li key={user.id} className="py-1 border-b last:border-b-0 cursor-pointer hover:bg-gray-200" onClick={() => onSelect(user.id)}>{user.name}</li>
                ))}
            </ul>
            <div className="flex gap-2">
                <button
                    className="px-2 py-1 bg-gray-300 rounded disabled:opacity-50"
                    onClick={() => prevPage && setPage(prevPage)}
                    disabled={!prevPage}
                >
                    Prev
                </button>
                <button
                    className="px-2 py-1 bg-gray-300 rounded disabled:opacity-50"
                    onClick={() => nextPage && setPage(nextPage)}
                    disabled={!nextPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
}