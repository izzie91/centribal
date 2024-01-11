"use client";
import { useState, useEffect, useCallback } from "react";
import ProductApiAdapter from "@/adapters/ProductApiAdapter";
import ProductService from "@/core/ProductService";

const LIMIT = 5;

const apiAdapter = new ProductApiAdapter();
const productService = new ProductService(apiAdapter);

const useProductTable = ({ langLabels }) => {
  const [products, setProducts] = useState(null);
  const [page, setPage] = useState(1);

  const getProducts = useCallback(async (offset, limit) => {
    await productService.fetchProductsPaginated(offset, limit, langLabels.ErrorMessge);
    setProducts(productService.getProducts());
  }, []);

  useEffect(() => {
    getProducts((page - 1) * LIMIT, LIMIT);
  }, []);

  const onIncreasePageHandler = () => {
    const page_ = page + 1;
    getProducts((page_ - 1) * LIMIT, LIMIT);
    setPage(page_);
  };

  const onDecreasePageHandler = () => {
    const page_ = page - 1;
    getProducts((page_ - 1) * LIMIT, LIMIT);
    setPage(page_);
  };

  return { products, page, onIncreasePageHandler, onDecreasePageHandler };
};

export default useProductTable;
