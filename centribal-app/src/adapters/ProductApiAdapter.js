import { productsClient } from "@/clients";
import { toast } from "react-toastify";

class ProductApiAdapter {
  async fetchProducts(errorMessage) {
    try {
      const res = await productsClient().getProducts();
      if (res.status == 200) {
        const resData = await res.json();
        return resData;
      }
    } catch (error) {
      toast.error(errorMessage);
      return [];
    }
  }

  async fetchProductsPaginated(offset, limit, errorMessage) {
    try {
      const res = await productsClient().getProductsPaginated(offset, limit);
      if (res.status == 200) {
        const resData = await res.json();
        return resData;
      }
    } catch (error) {
      toast.error(errorMessage);
      return [];
    }
  }

  async fetchProductById(productId, errorMessage) {
    try {
      const res = await productsClient().getProductById(productId);
      if (res.status == 200) {
        const resData = await res.json();
        return resData;
      }
    } catch (error) {
      toast.error(errorMessage);
      return [];
    }
  }

  async createProduct(data, createdMessage, errorMessage) {
    try {
      const res = await productsClient().newProduct(data);
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

  async updateProduct(productId, data, updatedMessage, errorMessage) {
    try {
      const res = await productsClient().editProductById(productId, data);

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

export default ProductApiAdapter;
