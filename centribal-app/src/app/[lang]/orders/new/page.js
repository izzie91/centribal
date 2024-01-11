import NewOrderForm from "@/components/orders/add/NewOrderForm";
import { getDictionary } from "../../../../../dictionary";

export default async function NewOrderPage({ params }) {
  const lang = await getDictionary(params.lang);
  return (
    <main className="flex min-h-screen flex-col items-center py-24">
      <div className="container mx-auto">
        <NewOrderForm langLabels={lang.newOrderPage.form}></NewOrderForm>
      </div>
    </main>
  );
}
