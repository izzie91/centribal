import OrderTable from "@/components/orders/OrderTable";
import { getDictionary } from "../../../../dictionary";

export default async function OrdersPage({ params }) {
  const lang = await getDictionary(params.lang);

  return (
    <main className="flex min-h-screen flex-col items-center py-24">
      <div className="container mx-auto">
        <OrderTable langLabels={lang.ordersPage.table}></OrderTable>
      </div>
    </main>
  );
}
