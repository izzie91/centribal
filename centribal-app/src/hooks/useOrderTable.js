"use client";
import { useState, useEffect, useCallback } from "react";
import { ordersService } from "@/clients";
import OrderApiAdapter from "@/adapters/OrderApiAdapter";
import OrderService from "@/core/OrderService";

const LIMIT = 5;

const apiAdapter = new OrderApiAdapter();
const orderService = new OrderService(apiAdapter);

const useOrderTable = () => {
  const [orders, setOrders] = useState(null);
  const [page, setPage] = useState(1);

  const getOrders = useCallback(async (offset, limit) => {
    await orderService.fetchOrders(offset, limit);
    setOrders(orderService.getOrders());
  }, []);

  useEffect(() => {
    getOrders((page - 1) * LIMIT, LIMIT);
  }, []);

  const onIncreasePageHandler = () => {
    const page_ = page + 1;
    getOrders((page_ - 1) * LIMIT, LIMIT);
    setPage(page_);
  };

  const onDecreasePageHandler = () => {
    const page_ = page - 1;
    getOrders((page_ - 1) * LIMIT, LIMIT);
    setPage(page_);
  };

  return { orders, page, onIncreasePageHandler, onDecreasePageHandler };
};

export default useOrderTable;
