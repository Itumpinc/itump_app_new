import {api} from '@store/api';
import {__} from '@utils/helpers';

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    refreshToken: builder.query<any, string>({
      query: (refreshToken: string) => ({
        url: `/v1/auth/refresh-tokens`,
        method: 'POST',
        data: {
          refresh_token: refreshToken,
        },
      }),
    }),
    existUser: builder.query<any, any>({
      query: (data: any) => ({
        url: `/v1/auth/user-exists`,
        method: 'POST',
        data,
      }),
    }),
    register: builder.query<any, any>({
      query: (data: any) => ({
        url: `/v1/auth/register`,
        method: 'POST',
        data,
      }),
    }),
    verifySignUp: builder.query<any, any>({
      query: (data: any) => ({
        url: `/v1/auth/verify-signup`,
        method: 'POST',
        data,
      }),
    }),
    loginwithPassword: builder.query<any, any>({
      query: (data: any) => ({
        url: `/v1/auth/login`,
        method: 'POST',
        data,
      }),
    }),
    loginwithAuthcode: builder.query<any, any>({
      query: (data: any) => ({
        url: `/v1/auth/login-auth`,
        method: 'POST',
        data,
      }),
    }),
    resendSignupCode: builder.query<any, any>({
      query: (data: any) => ({
        url: `/v1/auth/resend-signup-otp`,
        method: 'POST',
        data,
      }),
    }),
    forgotPassword: builder.query<any, string>({
      query: (email: string) => ({
        url: `/v1/auth/forgot-password`,
        method: 'POST',
        data: {email},
      }),
    }),
    getMedia: builder.query<any, string>({
      query: (ids: string) => ({
        url: `/v1/media/detail?media_ids=${ids}`,
        method: 'GET',
      }),
    }),
    resetPassword: builder.query<any, any>({
      query: (data: any) => ({
        url: `/v1/auth/reset-password`,
        method: 'POST',
        data,
      }),
    }),
    userProfile: builder.query<any, void>({
      query: () => ({
        url: `/v1/users/profile`,
        method: 'GET',
      }),
    }),
    getEntities: builder.query<any, number>({
      query: (countryId: number) => ({
        url: `/v1/business/entity-type?country_id=${countryId}`,
        method: 'GET',
      }),
    }),
    searchUser: builder.query<any, string>({
      query: (keyword: string) => ({
        url: `/v1/users/search?keyword=${keyword}`,
        method: 'GET',
      }),
    }),
    invoiceCalculate: builder.query<any, any>({
      query: (data: any) => ({
        url: `/v1/users/invoice/calculate`,
        method: 'POST',
        data,
      }),
    }),
    createInvoice: builder.query<any, any>({
      query: (data: any) => ({
        url: `/v1/users/invoice/create`,
        method: 'POST',
        data,
      }),
    }),
    listInvoice: builder.query<any, string>({
      query: (query: string) => ({
        url: `/v1/users/invoice/list${query}`,
        method: 'GET',
      }),
    }),
    detailInvoice: builder.query<any, string>({
      query: (invoice_num: string) => ({
        url: `/v1/users/invoice/detail/${invoice_num}`,
        method: 'GET',
      }),
    }),
    cancelInvoice: builder.query<any, any>({
      query: ({invoice_num, data}: {invoice_num: string; data: any}) => ({
        url: `/v1/users/invoice/cancel/${invoice_num}`,
        method: 'POST',
        data,
      }),
    }),
    getHealth: builder.query<any, number>({
      query: (businessId: number) => ({
        url: `/v1/business/health/${businessId}`,
        method: 'GET',
      }),
    }),
    getDashboard: builder.query<any, string>({
      query: (userID: string) => ({
        url: `/v1/users/dashboard?user_id=${userID}`,
        method: 'GET',
      }),
    }),
    getTransactions: builder.query<any, string>({
      query: (query: string) => ({
        url: `/v1/users/account-transactions${query}`,
        method: 'GET',
      }),
    }),
    updateProfile: builder.query<any, any>({
      query: (data: any) => ({
        url: `/v1/users/profile/update`,
        method: 'POST',
        data,
      }),
    }),
    changePassword: builder.query<any, any>({
      query: (data: any) => ({
        url: `/v1/users/pass-gen`,
        method: 'POST',
        data,
      }),
    }),
    closeAccount: builder.query<any, number>({
      query: (userId: number) => ({
        url: `/v1/users/delete/${userId}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});
