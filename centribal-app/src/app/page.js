import { redirect } from "next/navigation";

export default async function Index() {
  redirect("/sp");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-2xl font-bold text-indigo-500"></div>
    </main>
  );
}
