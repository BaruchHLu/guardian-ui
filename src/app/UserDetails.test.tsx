import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import UserDetails, { User } from "./UserDetails";

describe("UserDetails", () => {
    const user: User = { id: 1, name: "Alice" };

    it("renders user details", () => {
        render(<UserDetails user={user} onUpdate={() => { }} onDelete={() => { }} />);
        expect(screen.getByText(/ID: 1/)).toBeInTheDocument();
        expect(screen.getByDisplayValue("Alice")).toBeInTheDocument();
    });

    it("shows prompt when no user is selected", () => {
        render(<UserDetails user={null} onUpdate={() => { }} onDelete={() => { }} />);
        expect(screen.getByText(/Select a user/i)).toBeInTheDocument();
    });

    it("calls onUpdate when update button is clicked", () => {
        const onUpdate = jest.fn();
        render(<UserDetails user={user} onUpdate={onUpdate} onDelete={() => { }} />);
        fireEvent.change(screen.getByDisplayValue("Alice"), { target: { value: "Bob" } });
        fireEvent.click(screen.getByText("Update"));
        expect(onUpdate).toHaveBeenCalledWith(1, "Bob");
    });

    it("calls onDelete when delete button is clicked", () => {
        const onDelete = jest.fn();
        render(<UserDetails user={user} onUpdate={() => { }} onDelete={onDelete} />);
        fireEvent.click(screen.getByText("Delete"));
        expect(onDelete).toHaveBeenCalledWith(1);
    });
});
