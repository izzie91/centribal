// Core business logic (Hexagon)

class OrderService {
  constructor(apiAdapter) {
    this.apiAdapter = apiAdapter;
    this.orders = [];
    this.order = null;
  }

  async fetchOrdersPaginated(offset, limit, errorMessage) {
    this.orders = await this.apiAdapter.fetchOrdersPaginated(offset, limit, errorMessage);
  }

  async fetchOrderById(orderId, errorMessage) {
    this.order = await this.apiAdapter.fetchOrderById(orderId, errorMessage);
  }

  async createOrder(data, createdMessage, errorMessage) {
    await this.apiAdapter.createOrder(data, createdMessage, errorMessage);
  }

  async updateOrder(orderId, data, updatedMessage, errorMessage) {
    this.order = await this.apiAdapter.updateOrder(orderId, data, updatedMessage, errorMessage);
  }

  getOrders() {
    return this.orders;
  }

  getOrder() {
    return this.order;
  }
}

export default OrderService;
