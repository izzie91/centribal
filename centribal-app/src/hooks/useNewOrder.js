"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import OrderApiAdapter from "@/adapters/OrderApiAdapter";
import OrderService from "@/core/OrderService";
import ProductApiAdapter from "@/adapters/ProductApiAdapter";
import ProductService from "@/core/ProductService";

function generateRandomIdentifier(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let identifier = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    identifier += characters.charAt(randomIndex);
  }

  return identifier;
}

const apiOrderAdapter = new OrderApiAdapter();
const orderService = new OrderService(apiOrderAdapter);

const apiProductAdapter = new ProductApiAdapter();
const productService = new ProductService(apiProductAdapter);

const useNewOrder = ({ lang }) => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { defaultValues },
  } = useForm({
    defaultValues: {
      identifier: "",
      total: "0",
      taxTotal: "0",
    },
  });
  const [products, setProducts] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);

  const getProducts = useCallback(async () => {
    await productService.fetchProducts();
    setProducts(productService.getProducts());
  }, []);

  useEffect(() => {
    getProducts();
    setValue("identifier", generateRandomIdentifier(8));
  }, []);

  const newOrder = useCallback(
    async (data) => {
      await orderService.createOrder(data);
      router.push("/" + lang + "/orders");
    },
    [defaultValues]
  );

  const addProduct = (referenceCode, count) => {
    var selectedProductsArray = selectedProducts.slice(0, selectedProducts.length);
    const p = products.find((obj) => obj.referenceCode == referenceCode);
    var currentTotal = total;
    var currentTaxTotal = taxTotal;

    //product is not selected
    if (!selectedProducts.some((p) => p.referenceCode == referenceCode)) {
      selectedProductsArray.push({ referenceCode: p?.referenceCode, count: count });

      currentTotal = currentTotal + count * parseFloat(p?.price);
      currentTaxTotal = currentTaxTotal + count * parseFloat(p?.taxPrice);
    }
    //product is selected
    else {
      const previousCount = selectedProductsArray.find((p) => p.referenceCode == referenceCode).count;

      selectedProductsArray = selectedProductsArray.filter((p) => p.referenceCode != referenceCode);
      selectedProductsArray.push({ referenceCode: p?.referenceCode, count: count });

      currentTotal = currentTotal + (count - previousCount) * parseFloat(p?.price);
      currentTaxTotal = currentTaxTotal + (count - previousCount) * parseFloat(p?.taxPrice);
    }

    if (selectedProductsArray.length != 0) {
      setTotal(currentTotal);
      setTaxTotal(Math.round(currentTaxTotal * 100) / 100);
    } else {
      setTotal(0);
      setTaxTotal(0);
    }
    setSelectedProducts(selectedProductsArray);
  };

  const removeProduct = (referenceCode) => {
    var currentTotal = total;
    var currentTaxTotal = taxTotal;
    //find the product in the products to get the price and tax price
    const p = products.find((obj) => obj.referenceCode == referenceCode);

    //get the count and remove from selected products
    var selectedProductsArray = selectedProducts.slice(0, selectedProducts.length);
    const selectedCount = selectedProductsArray.find((obj) => obj.referenceCode == referenceCode).count;
    selectedProductsArray = selectedProductsArray.filter((p) => p.referenceCode != referenceCode);

    console.log(selectedCount);
    //change the total values
    currentTotal = currentTotal - selectedCount * parseFloat(p?.price);
    currentTaxTotal = currentTaxTotal - selectedCount * parseFloat(p?.taxPrice);

    if (selectedProductsArray.length != 0) {
      setTotal(Math.round(currentTotal * 100) / 100);
      setTaxTotal(Math.round(currentTaxTotal * 100) / 100);
    } else {
      setTotal(0);
      setTaxTotal(0);
    }
    setSelectedProducts(selectedProductsArray);
  };

  useEffect(() => {
    setValue("total", total);
    setValue("taxTotal", taxTotal);
  }, [total, taxTotal]);

  const onSubmit = (data) => {
    const dataOrder = {
      identifier: data.identifier,
      total: data.total,
      taxTotal: data.taxTotal,
      items: selectedProducts,
    };
    if (total == 0 || taxTotal == 0) {
      toast.error("You must select at least one product");
    } else {
      newOrder(dataOrder);
    }
  };

  return { handleSubmit, onSubmit, control, products, addProduct, removeProduct };
};

export default useNewOrder;
