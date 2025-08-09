import UserList from "./useList";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full p-4 md:p-24">
      <UserList />
      <div className="bg-gray-100 p-4 rounded-md">User Details / Edit Form</div>
    </div>
  );
}