"use client";
import { useCallback, useEffect } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import ProductApiAdapter from "@/adapters/ProductApiAdapter";
import ProductService from "@/core/ProductService";

const apiAdapter = new ProductApiAdapter();
const productService = new ProductService(apiAdapter);

const useEditProduct = ({ langLabels }) => {
  const { id: productId } = useParams();
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

  const getProductById = useCallback(async () => {
    await productService.fetchProductById(productId, langLabels.ErrorMessge);
    setValue("referenceCode", productService.getProduct().referenceCode);
    setValue("name", productService.getProduct().name);
    setValue("description", productService.getProduct().description);
    setValue("price", productService.getProduct().price);
    setValue("taxPrice", productService.getProduct().taxPrice);
  }, []);

  const editProductById = useCallback(
    async (data) => {
      await productService.updateProduct(productId, data, langLabels.updatedMessage, langLabels.ErrorMessge);
      setValue("referenceCode", productService.getProduct().referenceCode);
      setValue("name", productService.getProduct().name);
      setValue("description", productService.getProduct().description);
      setValue("price", productService.getProduct().price);
      setValue("taxPrice", productService.getProduct().taxPrice);
    },
    [defaultValues]
  );

  useEffect(() => {
    getProductById();
  }, [productId]);

  const onSubmit = (data) => {
    editProductById(data);
  };

  return { handleSubmit, onSubmit, control, setValue };
};

export default useEditProduct;
