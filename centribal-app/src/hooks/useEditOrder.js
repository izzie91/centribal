"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import OrderApiAdapter from "@/adapters/OrderApiAdapter";
import OrderService from "@/core/OrderService";
import ProductApiAdapter from "@/adapters/ProductApiAdapter";
import ProductService from "@/core/ProductService";

const apiOrderAdapter = new OrderApiAdapter();
const orderService = new OrderService(apiOrderAdapter);

const apiProductAdapter = new ProductApiAdapter();
const productService = new ProductService(apiProductAdapter);

const useEditOrder = () => {
  const { id: orderId } = useParams();
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { defaultValues },
  } = useForm({
    defaultValues: {
      identifier: "",
      total: "",
      taxTotal: "",
    },
  });
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);

  const getOrderById = useCallback(async () => {
    await orderService.fetchOrderById(orderId);
    setOrder(orderService.getOrder());
    setSelectedProducts(orderService.getOrder().items);
    setValue("identifier", orderService.getOrder().identifier);
    setTotal(orderService.getOrder().total);
    setTaxTotal(orderService.getOrder().taxTotal);
  }, []);

  const getProducts = useCallback(async () => {
    await productService.fetchProducts();
    setProducts(productService.getProducts());
  }, []);

  const editOrderById = useCallback(
    async (data) => {
      await orderService.updateOrder(orderId, data);
      setValue("referenceCode", orderService.getOrder().identifier);
      setValue("total", orderService.getOrder().total);
      setValue("taxTotal", orderService.getOrder().taxTotal);
    },
    [defaultValues]
  );

  useEffect(() => {
    getOrderById();
    getProducts();
  }, [orderId]);

  const onSubmit = (data) => {
    const dataOrder = {
      identifier: data.identifier,
      total: data.total,
      taxTotal: data.taxTotal,
      items: selectedProducts,
    };
    editOrderById(dataOrder);
  };

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

  return { handleSubmit, onSubmit, control, order, addProduct };
};

export default useEditOrder;
