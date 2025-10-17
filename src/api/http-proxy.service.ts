import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';
import type { AxiosRequestConfig } from 'axios';

export class HttpProxy {
    private readonly axios: AxiosInstance;

    constructor(timeout = 10000) {
        this.axios = axios.create({
            headers: {
                Accept: 'application/json',
            },
            timeout,
        });
    }

    async request<T = any>(
        logAs: string,
        path: string,
        method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
        requestData: Record<string, any> = {},
        isMultipart = false,
        bearerToken: string | null = null
    ): Promise<{
    statusCode: number;
    data?: T;
    errorType?: string;
    errorMessage?: string;
  }> {
        const logLabel = `[${logAs.toUpperCase()} ${method} ${path}]`;
        console.log(`${logLabel} - Sending request`, requestData);

        const config: AxiosRequestConfig = {
            method,
            url: path,
            headers: {
                Authorization: bearerToken ? `Bearer ${bearerToken}` : '',
            },
        };

        if (isMultipart) {
            const formData = new FormData();

            for (const key in requestData) {
                formData.append(key, requestData[key]);
            }

            config.data = formData;
        } else {
            config.data = requestData;
        }

        try {
            const response = await this.axios.request(config);
            console.log(`${logLabel} - SUCCESS`, response.data);
            return {
                statusCode: response.status,
                data: response.data,
            };
        } catch (error) {
            const axiosError = error as AxiosError;
            console.log(error);
            const statusCode = axiosError.response?.status ?? 500;

            if (
                axiosError.code === 'ECONNABORTED' ||
        axiosError.message.includes('timeout')
            ) {
                console.warn(`${logLabel} - TIMEOUT`, axiosError.message);
                return {
                    errorType: 'Connection Timeout',
                    errorMessage: 'Service timeout. Please try again later.',
                    statusCode,
                };
            }

            let errorType = 'Service Error';
            let errorMessage = axiosError.message;

            try {
                const errorData = axiosError.response?.data as {
          errorCode?: string;
          errorMessage?: string;
          message?: string;
        };
                errorType = errorData?.errorCode ?? errorType;
                errorMessage =
          errorData?.errorMessage ?? errorData?.message ?? errorMessage;
            } catch {}

            return {
                errorType,
                errorMessage,
                statusCode,
            };
        }
    }
}
