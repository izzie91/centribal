"use client";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import ProductApiAdapter from "@/adapters/ProductApiAdapter";
import ProductService from "@/core/ProductService";

const apiAdapter = new ProductApiAdapter();
const productService = new ProductService(apiAdapter);

const useNewProduct = ({ lang }) => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { defaultValues },
  } = useForm({
    defaultValues: {
      referenceCode: "",
      name: "",
      description: "",
      price: "",
      taxPrice: "",
    },
  });

  const newProduct = useCallback(
    async (data) => {
      await productService.createProduct(data);
      router.push("/" + lang + "/products");
    },
    [defaultValues]
  );

  const onSubmit = (data) => {
    newProduct(data);
  };

  return { handleSubmit, onSubmit, control, setValue };
};

export default useNewProduct;
