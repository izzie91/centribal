import { productsClient } from "@/clients";
import { toast } from "react-toastify";

class ProductApiAdapter {
  async fetchProducts() {
    try {
      const res = await productsClient().getProducts();
      if (res.status == 200) {
        const resData = await res.json();
        return resData;
      }
    } catch (error) {
      toast.error("Error fetching products from API");
      return [];
    }
  }

  async fetchProductsPaginated(offset, limit) {
    try {
      const res = await productsClient().getProductsPaginated(offset, limit);
      if (res.status == 200) {
        const resData = await res.json();
        return resData;
      }
    } catch (error) {
      toast.error("Error fetching products from API");
      return [];
    }
  }

  async fetchProductById(productId) {
    try {
      const res = await productsClient().getProductById(productId);
      if (res.status == 200) {
        const resData = await res.json();
        return resData;
      }
    } catch (error) {
      toast.error("Error fetching products from API");
      return [];
    }
  }

  async createProduct(data) {
    try {
      const res = await productsClient().newProduct(data);
      if (res.status == 201) {
        const resData = await res.json();
        toast.info("Product was reated");
        return resData;
      }
    } catch (error) {
      toast.error("Error creating product");
      return [];
    }
  }

  async updateProduct(productId, data) {
    try {
      const res = await productsClient().editProductById(productId, data);

      if (res.status == 200) {
        const resData = await res.json();
        toast.info("Product was saved");
        return resData;
      }
    } catch (error) {
      toast.error("Error fetching products from API");
      return [];
    }
  }
}

export default ProductApiAdapter;
