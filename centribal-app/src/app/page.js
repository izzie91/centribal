import { redirect } from "next/navigation";

export default async function Index() {
  redirect("/sp");
  return <main className="min-h-screen"></main>;
}
