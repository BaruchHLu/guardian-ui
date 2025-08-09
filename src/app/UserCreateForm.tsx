"use client";
import React, { useState } from "react";

interface UserCreateFormProps {
    onCreate: (name: string) => void;
    loading: boolean;
}

export default function UserCreateForm({ onCreate, loading }: UserCreateFormProps) {
    const [name, setName] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            setError("Name is required");
            return;
        }
        setError(null);
        onCreate(name.trim());
        setName("");
    };

    return (
        <form className="bg-gray-100 p-4 rounded-md mb-4" onSubmit={handleSubmit}>
            <h2 className="font-bold mb-2">Add New User</h2>
            <div className="flex gap-2 items-center mb-2">
                <input
                    className="border rounded px-2 py-1"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter name"
                    disabled={loading}
                />
                <button
                    className="px-2 py-1 bg-green-500 text-white rounded"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add"}
                </button>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
        </form>
    );
}
