import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import UserCreateForm from "./UserCreateForm";

describe("UserCreateForm", () => {
    it("renders form and validates input", () => {
        render(<UserCreateForm onCreate={() => { }} loading={false} />);
        expect(screen.getByText(/Add New User/i)).toBeInTheDocument();
        fireEvent.click(screen.getByText("Add"));
        expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    });

    it("calls onCreate with name", () => {
        const onCreate = jest.fn();
        render(<UserCreateForm onCreate={onCreate} loading={false} />);
        fireEvent.change(screen.getByPlaceholderText("Enter name"), { target: { value: "Charlie" } });
        fireEvent.click(screen.getByText("Add"));
        expect(onCreate).toHaveBeenCalledWith("Charlie");
    });

    it("shows loading state", () => {
        render(<UserCreateForm onCreate={() => { }} loading={true} />);
        expect(screen.getByText(/Adding.../i)).toBeInTheDocument();
    });
});
