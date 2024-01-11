import ProductTable from "@/components/products/ProductTable";
import { getDictionary } from "../../../../dictionary";

export default async function ProductsPage({ params }) {
  const lang = await getDictionary(params.lang);

  return (
    <main className="flex min-h-screen flex-col items-center py-24">
      <div className="container mx-auto">
        <ProductTable langLabels={lang.productsPage.table}></ProductTable>
      </div>
    </main>
  );
}
