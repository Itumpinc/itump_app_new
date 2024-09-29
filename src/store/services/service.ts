import {api} from '@store/api';
import {__} from '@utils/helpers';

const documentUploadFormData = (data: any) => {
  const formData = new FormData();
  formData.append(
    'media',
    data.media,
    // @ts-ignore
    data.media.name.toLowerCase().replace(/[^a-zA-Z0-9-_ .]/g, ''),
  );
  formData.append('document_type', data.document_type);
  if (data.business_id) formData.append('business_id', data.business_id);

  if (data.service_id) {
    formData.append('service_id', data.service_id);
    formData.append('service_request_id', data.service_request_id);
  }

  return formData;
};

export const serviceApi = api.injectEndpoints({
  endpoints: builder => ({
    serviceList: builder.query<any, any>({
      query: ({business_id, user_id}: any) => {
        let url = `/v1/master/service/list?status=active&limit=50&user_id=${user_id}`;
        if (business_id) {
          url += `&business_id=${business_id}`;
        }
        return {
          url,
          method: 'GET',
        };
      },
    }),
    serviceDetail: builder.query<any, any>({
      query: ({
        business_id,
        id_tag,
      }: {
        business_id: number;
        id_tag: number | string;
      }) => {
        let url = `/v1/master/service/detail/${id_tag}`;
        if (business_id) {
          url += `?business_id=${business_id}`;
        }
        return {
          url,
          method: 'GET',
        };
      },
    }),
    serviceRequestDetail: builder.query<any, any>({
      query: ({
        service_id,
        tag,
        business_id,
      }: {
        service_id?: number;
        tag: string;
        business_id?: number;
      }) => {
        let url = '';
        if (service_id) {
          url = `/v1/service/detail/${tag}/${service_id}`;
        }
        if (business_id) {
          url = `/v1/service/detail_business/${tag}/${business_id}`;
        }

        return {
          url,
          method: 'GET',
        };
      },
    }),
    businessCreate: builder.query<any, any>({
      query: (data: any) => ({
        url: `/v1/business/create`,
        method: 'POST',
        data,
      }),
    }),
    businessUpdate: builder.query<any, any>({
      query: ({businessId, data}: any) => ({
        url: `/v1/business/update/${businessId}`,
        method: 'POST',
        data,
      }),
    }),
    getBusinessDetail: builder.query<any, number>({
      query: (businessId: number) => ({
        url: `/v1/business/detail/${businessId}`,
        method: 'GET',
      }),
    }),
    getAddonsByService: builder.query<any, number>({
      query: (serviceId: number) => ({
        url: `/v1/business/addOns/${serviceId}`,
        method: 'GET',
      }),
    }),
    uploadDocument: builder.mutation<any, any>({
      query: (data: any) => {
        const formData = documentUploadFormData(data);
        return {
          url: `/v1/media/document-upload`,
          method: 'POST',
          data: formData,
          formData: true,
        };
      },
    }),
    createServiceOrder: builder.query<any, any>({
      query: (data: any) => ({
        url: `/v1/service/order/create`,
        method: 'POST',
        data,
      }),
    }),
    createServiceOrderBind: builder.query<any, any>({
      query: ({order_id, data}: any) => ({
        url: `/v1/service/order/bind/${order_id}`,
        method: 'POST',
        data,
      }),
    }),
    createServiceOrderVerify: builder.query<any, any>({
      query: ({order_id, data}: any) => ({
        url: `/v1/service/order/confirm/${order_id}`,
        method: 'POST',
        data,
      }),
    }),
    createServiceOrderComputation: builder.query<any, any>({
      query: (data: any) => ({
        url: `/v1/service/order/computation`,
        method: 'POST',
        data,
      }),
    }),
    serviceCreate: builder.query<any, any>({
      query: ({tag, data}: any) => ({
        url: `/v1/service/create/${tag}`,
        method: 'POST',
        data,
      }),
    }),
    serviceUpdate: builder.query<any, any>({
      query: ({id, tag, data}: any) => ({
        url: `/v1/service/update/${tag}/${id}`,
        method: 'POST',
        data,
      }),
    }),
    createActivation: builder.query<any, any>({
      query: (data: any) => ({
        url: `/v1/users/activate-pro`,
        method: 'POST',
        data,
      }),
    }),
    verifyActivation: builder.query<any, void>({
      query: () => ({
        url: `/v1/users/verify-pro`,
        method: 'POST',
        data: {},
      }),
    }),
    connectAccount: builder.query<any, void>({
      query: () => ({
        url: `/v1/users/account/create`,
        method: 'POST',
      }),
    }),
    payoutAccount: builder.query<any, any>({
      query: (data: any) => ({
        url: `/v1/users/wallet/payout`,
        method: 'POST',
        data,
      }),
    }),
    accountStatusUpdate: builder.query<any, any>({
      query: (data: any) => ({
        url: `/v1/users/account/update/status`,
        method: 'POST',
        data,
      }),
    }),
    payInvoice: builder.query<any, any>({
      query: ({invoice_no, data}: any) => ({
        url: `/v1/users/invoice/pay/${invoice_no}`,
        method: 'POST',
        data,
      }),
    }),
  }),
  overrideExisting: false,
});
