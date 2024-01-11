// Core business logic (Hexagon)

class ProductService {
  constructor(apiAdapter) {
    this.apiAdapter = apiAdapter;
    this.products = [];
    this.product = null;
  }

  async fetchProducts(errorMessage) {
    this.products = await this.apiAdapter.fetchProducts(errorMessage);
  }

  async fetchProductsPaginated(offset, limit, errorMessage) {
    this.products = await this.apiAdapter.fetchProductsPaginated(offset, limit, errorMessage);
  }

  async fetchProductById(productId, errorMessage) {
    this.product = await this.apiAdapter.fetchProductById(productId, errorMessage);
  }

  async createProduct(data, createdMessage, errorMessage) {
    await this.apiAdapter.createProduct(data, createdMessage, errorMessage);
  }

  async updateProduct(productId, data, updatedMessage, errorMessage) {
    this.product = await this.apiAdapter.updateProduct(productId, data, updatedMessage, errorMessage);
  }

  getProducts() {
    return this.products;
  }

  getProduct() {
    return this.product;
  }
}

export default ProductService;
