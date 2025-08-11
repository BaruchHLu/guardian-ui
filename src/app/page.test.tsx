import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./page";

beforeEach(() => {
    global.fetch = jest.fn((input: string, init?: RequestInit) => {
        const url = input;
        if (url.includes("/users?page=")) {
            return Promise.resolve({
                ok: true,
                json: async () => ({
                    users: [
                        { id: 1, name: "Alice" },
                        { id: 2, name: "Bob" }
                    ],
                    nextPage: 2,
                    prevPage: null
                })
            });
        }
        if (url.includes("/users/1")) {
            return Promise.resolve({
                ok: true,
                json: async () => ({ id: 1, name: "Alice" })
            });
        }
        if (url.includes("/users/2")) {
            return Promise.resolve({
                ok: true,
                json: async () => ({ id: 2, name: "Bob" })
            });
        }
        if (url.endsWith("/users") && init?.method === "POST") {
            return Promise.resolve({
                ok: true,
                json: async () => ({ id: 3, name: "Charlie" })
            });
        }
        return Promise.resolve({ ok: false });
    }) as jest.Mock;
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe("Home page component", () => {
    it("renders user list and details", async () => {
        render(<Home />);
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
        await waitFor(() => expect(screen.getByText("Alice")).toBeInTheDocument());
        expect(screen.getByText("Bob")).toBeInTheDocument();
    });

    it("can select a user and show details", async () => {
        render(<Home />);
        await waitFor(() => expect(screen.getByText("Alice")).toBeInTheDocument());
        fireEvent.click(screen.getByText("Alice"));
        await waitFor(() => expect(screen.getByText(/ID: 1/)).toBeInTheDocument());
        expect(screen.getByDisplayValue("Alice")).toBeInTheDocument();
    });

    it("can add a new user", async () => {
        render(<Home />);
        await waitFor(() => expect(screen.getByText("Add New User")).toBeInTheDocument());
        fireEvent.change(screen.getByPlaceholderText("Enter name"), { target: { value: "Charlie" } });
        fireEvent.click(screen.getByText("Add"));
        await waitFor(() => expect(screen.getByText("Charlie")).toBeInTheDocument());
    });
});