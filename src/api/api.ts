import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Item } from "../pages/cart/card.slice";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://app.aaccent.su/js/",
  }),
  endpoints: (build) => ({
    postProduct: build.mutation<void, {items: Item[], phone: string, name: string}>({
      query: (data) => ({
        url: "confirm.php",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          // "Content-Type": "application/json",
        },
      }),
    }),
  }),
});
