// Core business logic (Hexagon)

class OrderService {
  constructor(apiAdapter) {
    this.apiAdapter = apiAdapter;
    this.orders = [];
    this.order = null;
  }

  async fetchOrders(offset, limit) {
    this.orders = await this.apiAdapter.fetchOrders(offset, limit);
  }

  async fetchOrderById(orderId) {
    this.order = await this.apiAdapter.fetchOrderById(orderId);
  }

  async createOrder(data) {
    await this.apiAdapter.createOrder(data);
  }

  async updateOrder(orderId, data) {
    this.order = await this.apiAdapter.updateOrder(orderId, data);
  }

  getOrders() {
    return this.orders;
  }

  getOrder() {
    return this.order;
  }
}

export default OrderService;
