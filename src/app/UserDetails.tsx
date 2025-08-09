"use client";
import React, { useState, useEffect } from "react";

export interface User {
    id: number;
    name: string;
}

interface UserDetailsProps {
    user: User | null;
    onUpdate: (id: number, name: string) => void;
    onDelete: (id: number) => void;
}

export default function UserDetails({ user, onUpdate, onDelete }: UserDetailsProps) {
    const [editName, setEditName] = useState(user?.name || "");
    useEffect(() => { setEditName(user?.name || ""); }, [user]);
    if (!user) return <div className="bg-gray-100 p-4 rounded-md">Select a user to view details.</div>;
    return (
        <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="font-bold mb-2">User Details</h2>
            <div className="mb-2">ID: {user.id}</div>
            <div className="mb-2">Name: <input className="border rounded px-2 py-1" value={editName} onChange={e => setEditName(e.target.value)} /></div>
            <div className="flex gap-2 mt-4">
                <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={() => onUpdate(user.id, editName)}>Update</button>
                <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => onDelete(user.id)}>Delete</button>
            </div>
        </div>
    );
}
