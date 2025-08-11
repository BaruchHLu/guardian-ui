import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import UserList from "./UserList";
import type { User } from "./UserDetails";

describe("UserList", () => {
    const users: User[] = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" }
    ];

    it("renders users", () => {
        render(
            <UserList
                users={users}
                loading={false}
                error={null}
                onSelect={() => { }}
                page={1}
                nextPage={2}
                prevPage={null}
                setPage={() => { }}
            />
        );
        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.getByText("Bob")).toBeInTheDocument();
    });

    it("shows loading state", () => {
        render(
            <UserList
                users={[]}
                loading={true}
                error={null}
                onSelect={() => { }}
                page={1}
                nextPage={null}
                prevPage={null}
                setPage={() => { }}
            />
        );
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });

    it("shows error state", () => {
        render(
            <UserList
                users={[]}
                loading={false}
                error="Failed to fetch"
                onSelect={() => { }}
                page={1}
                nextPage={null}
                prevPage={null}
                setPage={() => { }}
            />
        );
        expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument();
    });

    it("calls onSelect when user is clicked", () => {
        const onSelect = jest.fn();
        render(
            <UserList
                users={users}
                loading={false}
                error={null}
                onSelect={onSelect}
                page={1}
                nextPage={2}
                prevPage={null}
                setPage={() => { }}
            />
        );
        fireEvent.click(screen.getByText("Alice"));
        expect(onSelect).toHaveBeenCalledWith(1);
    });
});
