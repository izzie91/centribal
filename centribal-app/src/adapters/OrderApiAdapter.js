import { ordersClient } from "@/clients";
import { toast } from "react-toastify";

class OrderApiAdapter {
  async fetchOrders(offset, limit) {
    try {
      const res = await ordersClient().getOrdersPaginated(offset, limit);
      if (res.status == 200) {
        const resData = await res.json();
        return resData;
      }
    } catch (error) {
      //console.error("Error fetching products from API", error);
      toast.error("Error fetching orders from API");
      return [];
    }
  }

  async fetchOrderById(orderId) {
    try {
      const res = await ordersClient().getOrderById(orderId);
      if (res.status == 200) {
        const resData = await res.json();
        return resData;
      }
    } catch (error) {
      toast.error("Error fetching orders from API");
      return [];
    }
  }

  async createOrder(data) {
    try {
      const res = await ordersClient().newOrder(data);
      if (res.status == 201) {
        const resData = await res.json();
        toast.info("Order was created");
        return resData;
      }
    } catch (error) {
      toast.error("Error creating product");
      return [];
    }
  }

  async updateOrder(orderId, data) {
    try {
      const res = await ordersClient().editOrderById(orderId, data);

      if (res.status == 200) {
        const resData = await res.json();
        toast.info("Order was saved");
        return resData;
      }
    } catch (error) {
      toast.error("Error fetching products from API");
      return [];
    }
  }
}

export default OrderApiAdapter;
