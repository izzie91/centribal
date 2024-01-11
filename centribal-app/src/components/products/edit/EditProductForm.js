"use client";
import { useParams } from "next/navigation";
import { Controller } from "react-hook-form";
import useEditProduct from "@/hooks/useEditProduct";

const calculateTaxes = (price) => {
  if (price == "") {
    return 0;
  } else {
    return (parseInt(price) + 0.21 * parseInt(price)).toString();
  }
};

export default function EditProductForm({ langLabels }) {
  const { lang } = useParams();
  const { handleSubmit, onSubmit, control, setValue } = useEditProduct({ lang });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-md bg-white p-8 border-[1px]">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">{langLabels.mainLabel}</h2>
          <p className="mt-2 text-sm text-gray-700">{langLabels.caption}</p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <Controller
              name="referenceCode"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <div className="sm:col-span-4">
                  <label htmlFor="product-reference-code" className="block text-sm font-medium leading-6 text-gray-900">
                    {langLabels.referenceLabel}
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name={name}
                        value={value}
                        id="product-reference-code"
                        className="px-2 block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        onChange={(e) => {
                          onChange(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            />
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <div className="sm:col-span-4">
                  <label htmlFor="product-name" className="block text-sm font-medium leading-6 text-gray-900">
                    {langLabels.nameLabel}
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name={name}
                        value={value}
                        id="product-name"
                        className="px-2 block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        onChange={(e) => {
                          onChange(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            />
            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <div className="col-span-full">
                  <label htmlFor="product-description" className="block text-sm font-medium leading-6 text-gray-900">
                    {langLabels.descriptionLabel}
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="product-description"
                      name={name}
                      value={value}
                      rows={3}
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                    />
                  </div>
                </div>
              )}
            />
            <Controller
              name="price"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <div className="sm:col-span-4">
                  <label htmlFor="product-price" className="block text-sm font-medium leading-6 text-gray-900">
                    {langLabels.priceLabel}
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name={name}
                        value={value}
                        id="product-price"
                        autoComplete="name"
                        className="px-2 block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        onChange={(e) => {
                          setValue("taxPrice", calculateTaxes(e.target.value));
                          onChange(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            />
            <Controller
              name="taxPrice"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <div className="sm:col-span-4">
                  <label htmlFor="product-tax-price" className="block text-sm font-medium leading-6 text-gray-900">
                    {langLabels.taxPriceLabel} 21 %
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        disabled={true}
                        type="text"
                        name={name}
                        value={value}
                        id="product-tax-price"
                        autoComplete="name"
                        className="px-2 block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-2">
        <a
          href={"/" + lang + "/products"}
          className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:text-slate-300 disabled:hover:bg-white disabled:cursor-not-allowed"
        >
          {langLabels.backButton}
        </a>
        <button
          type="submit"
          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {langLabels.saveButton}
        </button>
      </div>
    </form>
  );
}
