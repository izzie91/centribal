const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const RELATIVE_URL = "orders";

const URLs = {
  getOrders: {
    path: BASE_URL + RELATIVE_URL,
  },
  getOrdersPaginated: {
    path: BASE_URL + RELATIVE_URL + "?_",
  },
  getOrderById: {
    path: BASE_URL + RELATIVE_URL,
  },
  newOrder: {
    path: BASE_URL + RELATIVE_URL,
  },
  editOrderById: {
    path: BASE_URL + RELATIVE_URL,
  },
};

//Service
export default () => ({
  getOrders: () =>
    fetch(URLs.getOrders.path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    }),
  getOrdersPaginated: (offset, limit) =>
    fetch(URLs.getOrdersPaginated.path + "start=" + offset + "&_" + "limit=" + limit, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    }),
  getOrderById: (orderId) =>
    fetch(URLs.getOrderById.path + "/" + orderId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    }),
  newOrder: (bodyRequest) =>
    fetch(URLs.newOrder.path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyRequest),
      next: { revalidate: 0 },
    }),
  editOrderById: (orderId, bodyRequest) =>
    fetch(URLs.editOrderById.path + "/" + orderId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyRequest),
      next: { revalidate: 0 },
    }),
});
