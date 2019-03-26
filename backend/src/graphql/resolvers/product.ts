import db from '../../db';


const products = async () => {
        try{
            const products : Array<Product> = await db.select('*')
                                                    .from('product');
            return products.map((product : Product) => {
                return {
                    IdP: product.idp,
                    name: product.name,
                    category: product.category,
                    brand: product.brand,
                    price: product.price,
                    description: product.description
                }
            })
        } catch(e){
            throw e
        }
    }

export {products}
