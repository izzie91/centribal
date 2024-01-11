import { redirect } from "next/navigation";

export default async function Index() {
  redirect("/sp");
  return <main className="flex min-h-screen flex-col items-center justify-center"></main>;
}
