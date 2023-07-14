/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */
import { IOContext, InstanceOptions, JanusClient } from "@vtex/api";

export default class CatalogClient extends JanusClient {
    constructor(ctx: IOContext, options?: InstanceOptions) {
        super(ctx, {
            ...options,
            headers: {
                ...options?.headers,
                VtexIdclientAutCookie: ctx.authToken
            }
        })
    }

    /**
     * getProductById
       productId: number     
    */
    public getProductById(productId: number) {
        return this.http.get(`/api/catalog/pvt/product/${productId}`)
    }
}