import { getDictionary } from "../../../dictionary";

export default async function Home({ params }) {
  const lang = await getDictionary(params.lang);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-2xl font-bold text-indigo-500">{lang.homepage.welcome}</div>
    </main>
  );
}
