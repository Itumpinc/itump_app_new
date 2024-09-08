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
  }),
  overrideExisting: false,
});
