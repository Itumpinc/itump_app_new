import {api} from '@store/api';
import {__} from '@utils/helpers';

export const commonApi = api.injectEndpoints({
  endpoints: builder => ({
    loadInit: builder.query<any, void>({
      query: () => ({
        url: `/v1/master/country/dropdown`,
      }),
    }),
    loadCountry: builder.query<any, void>({
      query: () => ({
        url: `/v1/master/country/dropdown`,
      }),
    }),
    loadState: builder.query<any, number>({
      query: (id: number) => ({
        url: `/v1/master/state/dropdown/${id}`,
      }),
    }),
    getStaticBox: builder.query({
      query: (id: string) => ({
        url: `/v1/init/staticbox/detail/${id}`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});
