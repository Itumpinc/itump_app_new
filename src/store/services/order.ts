import {api} from '@store/api';
import {__} from '@utils/helpers';

export const orderApi = api.injectEndpoints({
  endpoints: builder => ({
    loadUsersOrder: builder.query<any, string>({
      query: (query?: string) => ({
        url: `/v1/service/order/list${query}`,
        method: 'GET',
      }),
    }),
    loadUsersDocument: builder.query<any, string>({
      query: (query: string) => ({
        url: `/v1/business/document/get_all${query}`,
      }),
    }),
    deleteDocument: builder.query<any, number>({
      query: (documentId: number) => ({
        url: `/v1/business/document/delete/${documentId}`,
        method: 'DELETE',
      }),
    }),
    orderDetail: builder.query<any, string>({
      query: (orderId: string) => ({
        url: `/v1/service/order/detail/${orderId}`,
      }),
    }),
    orderDetailStatus: builder.query<any, number>({
      query: (itemId: number) => ({
        url: `/v1/service/order/item-log/${itemId}`,
      }),
    }),
  }),
  overrideExisting: false,
});
