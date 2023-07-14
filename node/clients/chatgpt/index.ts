/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */
import { ExternalClient, IOContext, InstanceOptions } from "@vtex/api";

export default class ChatGPTClient extends ExternalClient {
    constructor(ctx: IOContext, options?: InstanceOptions) {
        super('https://api.openai.com', ctx, {
            ...options,
            headers: {
                ...options?.headers,
                'X-VTEX-Use-https': 'true',
                Authorization:
                    'Bearer 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',
            }
        })
    }

    /**
     * getDescription
     */
    public getDescription(content: string) {
        return this.http
            .post(`/v1/chat/completions`, {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content,
                    },
                ],
            })
            .then((data: any) => {
                const [choice] = data.choices

                const description = choice.message.content

                return {
                    description,
                }
            })
            .catch((error) => {
                const response = error?.response?.data ?? 'Error in chatgpt'

                return { response };
            })
    }
}
