import EditProductForm from "@/components/products/edit/EditProductForm";
import { getDictionary } from "../../../../../dictionary";

export default async function ProductDetailsPage({ params }) {
  const lang = await getDictionary(params.lang);
  return (
    <main className="flex min-h-screen flex-col items-center py-24">
      <div className="container mx-auto">
        <EditProductForm langLabels={lang.productsDetailPage.form}></EditProductForm>
      </div>
    </main>
  );
}
