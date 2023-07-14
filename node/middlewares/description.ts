/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import { json } from 'co-body'

export async function createMessage(ctx: Context, next: () => Promise<any>) {
    const {
        req,
        clients: { catalog },
        vtex: { logger }
    } = ctx;

    try {
        const body = await json(req);
        const product = await catalog.getProductById(body?.productId)

        const TEMPLATE = `Actúa como si fueras un experto en copywriter, exporto en marketing digital y un experto en comercio electrónico, quiero que me generes la mejor descripción  para el producto llamado "${product?.Name}", el texto debe estar optimizado para SEO web y debe ser lo mas amigable posible para los clientes de nuestro ecommerce, usa un tono serio pero amistoso, la descripción debe tener un máximo de 200 caracteres`

        // ctx.body = {
        //     body,
        //     funciona: "Success",
        //     product
        // }

        ctx.state.text = TEMPLATE

        await next();
    } catch (error) {
        logger.error({
            message: "Error en GET product",
            detail: error
        })
    }
}

export async function sendMessage(ctx: Context, next: () => Promise<any>) {
    const {
        state: { text },
        clients: { chatgpt },
        vtex: { logger },
    } = ctx;

    try {
        const response = await chatgpt.getDescription(text)

        ctx.body = response
    } catch (error) {
        logger.error({
            message: 'Error en CHATGPT',
            detail: error,
        })
    }

    await next()
}