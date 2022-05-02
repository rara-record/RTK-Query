import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const YOUR_APP_KEY = "15cd5a972c0ab728a4fd4013bdb9eca1";
const YOUR_APP_ID = "8d2c9d06";

// api와 reducer 연결
export const recipeApi = createApi({
  reducerPath: "recipeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.edamam.com/" }),
  endpoints: (builder) => ({
    getRecipes: builder.mutation({
      query: ({ query, health }) => {
        return {
          url: `search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${health}`,
        };
      },
    }),
  }),
});

export const useGetRecipeMutation = recipeApi;

/**
 * mutation:
 * 서버에게 데이터 업데이트를 전달하고 로컬에서 변화된 값을 적용 시킬때 사용
 * 캐시 무효화와 강제 리패칭을 할 수 있음
 */
