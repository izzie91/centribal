// Core business logic (Hexagon)

class ProductService {
  constructor(apiAdapter) {
    this.apiAdapter = apiAdapter;
    this.products = [];
    this.product = null;
  }

  async fetchProducts() {
    this.products = await this.apiAdapter.fetchProducts();
  }

  async fetchProductsPaginated(offset, limit) {
    this.products = await this.apiAdapter.fetchProductsPaginated(offset, limit);
  }

  async fetchProductById(productId) {
    this.product = await this.apiAdapter.fetchProductById(productId);
  }

  async createProduct(data) {
    await this.apiAdapter.createProduct(data);
  }

  async updateProduct(productId, data) {
    this.product = await this.apiAdapter.updateProduct(productId, data);
  }

  getProducts() {
    return this.products;
  }

  getProduct() {
    return this.product;
  }
}

export default ProductService;
