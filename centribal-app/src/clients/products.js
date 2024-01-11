const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const RELATIVE_URL = "products";

const URLs = {
  getProducts: {
    path: BASE_URL + RELATIVE_URL,
  },
  getProductsPaginated: {
    path: BASE_URL + RELATIVE_URL + "?_",
  },
  getProductById: {
    path: BASE_URL + RELATIVE_URL,
  },
  newProduct: {
    path: BASE_URL + RELATIVE_URL,
  },
  editProductById: {
    path: BASE_URL + RELATIVE_URL,
  },
};

//Service
export default () => ({
  getProducts: () =>
    fetch(URLs.getProducts.path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    }),
  getProductsPaginated: (offset, limit) =>
    fetch(URLs.getProductsPaginated.path + "start=" + offset + "&_" + "limit=" + limit, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    }),
  getProductById: (productId) =>
    fetch(URLs.getProductById.path + "/" + productId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    }),
  newProduct: (bodyRequest) =>
    fetch(URLs.newProduct.path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyRequest),
      next: { revalidate: 0 },
    }),
  editProductById: (productId, bodyRequest) =>
    fetch(URLs.editProductById.path + "/" + productId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyRequest),
      next: { revalidate: 0 },
    }),
});
