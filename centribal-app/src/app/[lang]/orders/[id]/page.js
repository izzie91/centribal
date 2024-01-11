import EditOrderForm from "@/components/orders/edit/EditOrderForm";
import { getDictionary } from "../../../../../dictionary";

export default async function OrderDetailsPage({ params }) {
  const lang = await getDictionary(params.lang);
  return (
    <main className="flex min-h-screen flex-col items-center py-24">
      <div className="container mx-auto">
        <EditOrderForm langLabels={lang.ordersDetailPage.form}></EditOrderForm>
      </div>
    </main>
  );
}
