import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../UserDetails';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page: number) => {
    const res = await fetch(`http://localhost:4000/users?page=${page}&pageSize=2`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return await res.json();
  }
);

export const fetchUserDetails = createAsyncThunk(
  'users/fetchUserDetails',
  async (id: number) => {
    const res = await fetch(`http://localhost:4000/users/${id}`);
    if (!res.ok) throw new Error('Failed to fetch user details');
    return await res.json();
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (name: string) => {
    const res = await fetch('http://localhost:4000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    if (!res.ok) throw new Error('Failed to create user');
    return await res.json();
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, name }: { id: number; name: string }) => {
    const res = await fetch(`http://localhost:4000/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    if (!res.ok) throw new Error('Failed to update user');
    return await res.json();
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: number) => {
    const res = await fetch(`http://localhost:4000/users/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete user');
    return id;
  }
);

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  page: number;
  nextPage: number | null;
  prevPage: number | null;
  selectedUser: User | null;
  detailsLoading: boolean;
  detailsError: string | null;
  createLoading: boolean;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  page: 1,
  nextPage: null,
  prevPage: null,
  selectedUser: null,
  detailsLoading: false,
  detailsError: null,
  createLoading: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setSelectedUser(state, action: PayloadAction<User | null>) {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.nextPage = action.payload.nextPage;
        state.prevPage = action.payload.prevPage;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.detailsError = action.error.message || null;
      })
      .addCase(createUser.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.createLoading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
        state.users = state.users.map(u => u.id === action.payload.id ? action.payload : u);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(u => u.id !== action.payload);
        state.selectedUser = null;
      });
  }
});

export const { setPage, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
