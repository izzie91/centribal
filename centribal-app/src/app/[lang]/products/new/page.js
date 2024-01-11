import NewProductForm from "@/components/products/add/NewProductForm";
import { getDictionary } from "../../../../../dictionary";

export default async function NewProductPage({ params }) {
  const lang = await getDictionary(params.lang);
  return (
    <main className="flex min-h-screen flex-col items-center py-24">
      <div className="container mx-auto">
        <NewProductForm langLabels={lang.newProductPage.form}></NewProductForm>
      </div>
    </main>
  );
}
