"use client";
import { useParams } from "next/navigation";
import useOrderTable from "@/hooks/orders/useOrderTable";

export default function OrderTable({ langLabels }) {
  const { lang } = useParams();
  const { orders, page, onIncreasePageHandler, onDecreasePageHandler } = useOrderTable({ langLabels });

  return (
    <div className="w-full rounded-md bg-white p-4 border-[1px]">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Orders</h1>
            <p className="mt-2 text-sm text-gray-700">A list of all orders</p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <a
              href={"/" + lang + "/orders/new"}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {langLabels.newOrderButton}
            </a>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      {langLabels.referenceHeader}
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      {langLabels.totalHeader}
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      {langLabels.taxTotalHeader}
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">{langLabels.detailsLink}</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders?.map((order, i) => (
                    <tr key={i}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {order?.identifier}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order?.total}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order?.taxTotal}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a href={"/" + lang + "/orders/" + order?.id} className="text-indigo-600 hover:text-indigo-900">
                          {langLabels.detailsLink}
                          <span className="sr-only">, {order?.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {orders?.length == 0 && (
                <div className="w-full bg-gray-100 p-2 my-2 text-sm">{langLabels.emptyListMessage}</div>
              )}
              <h6 className="text-sm">Page: {page}</h6>
              <div className="my-4 flex flex-1 justify-between sm:justify-end">
                <button
                  disabled={page == 1 ? true : false}
                  onClick={onDecreasePageHandler}
                  className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:text-slate-300 disabled:hover:bg-white disabled:cursor-not-allowed"
                >
                  {langLabels.backButton}
                </button>
                <button
                  disabled={orders?.length == 0 ? true : false}
                  onClick={onIncreasePageHandler}
                  className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:text-slate-300 disabled:hover:bg-white disabled:cursor-not-allowed"
                >
                  {langLabels.nextButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
