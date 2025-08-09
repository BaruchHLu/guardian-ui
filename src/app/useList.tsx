"use client";
import React, { useEffect, useState } from "react";

export default function UserList() {
    const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);

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

    return (
        <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="font-bold mb-2">User List (Paginated)</h2>
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
            <ul className="mb-4">
                {users.map((user: { id: number; name: string }) => (
                    <li key={user.id} className="py-1 border-b last:border-b-0">{user.name}</li>
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