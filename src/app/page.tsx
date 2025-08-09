export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="grid grid-cols-2 gap-8 w-full">
        <div className="bg-gray-100 p-4 rounded-md">User List (Paginated)</div>
        <div className="bg-gray-200 p-4 rounded-md">User Details / Edit Form</div>
      </div>
    </main>
  );
}