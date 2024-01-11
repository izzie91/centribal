import { ordersClient } from "@/clients";
import { toast } from "react-toastify";

class OrderApiAdapter {
  async fetchOrdersPaginated(offset, limit, errorMessage) {
    try {
      const res = await ordersClient().getOrdersPaginated(offset, limit);
      if (res.status == 200) {
        const resData = await res.json();
        return resData;
      }
    } catch (error) {
      toast.error(errorMessage);
      return [];
    }
  }

  async fetchOrderById(orderId, errorMessage) {
    try {
      const res = await ordersClient().getOrderById(orderId);
      if (res.status == 200) {
        const resData = await res.json();
        return resData;
      }
    } catch (error) {
      toast.error(errorMessage);
      return [];
    }
  }

  async createOrder(data, createdMessage, errorMessage) {
    try {
      const res = await ordersClient().newOrder(data);
      if (res.status == 201) {
        const resData = await res.json();
        toast.info(createdMessage);
        return resData;
      }
    } catch (error) {
      toast.error(errorMessage);
      return [];
    }
  }

  async updateOrder(orderId, data, updatedMessage, errorMessage) {
    try {
      const res = await ordersClient().editOrderById(orderId, data);

      if (res.status == 200) {
        const resData = await res.json();
        toast.info(updatedMessage);
        return resData;
      }
    } catch (error) {
      toast.error(errorMessage);
      return [];
    }
  }
}

export default OrderApiAdapter;
