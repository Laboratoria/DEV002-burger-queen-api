const {
    isAuthenticated
} = require('../middleware/auth');

const { 
    addProductOrder,
    deleteProductOrder
} = require('../controller/productOrder')

module.exports = (app, nextMain) => {    
    /**
     * @name POST /orders/:orderId/products/:productId/:qty
     */
    app.post('/orders/:orderId/products', isAuthenticated, async(req, resp, next) => {
        try {
            const { orderId } = req.params
            const products = req.body.products.map(product => {
                return { ...product, order_no: orderId }
            })
            const productAdded = await addProductOrder(products)
            resp.send(productAdded)
        } catch (error) {
            console.log(error)
            resp.status(500).send(error) 
        }
    });

    app.delete('/productOrders/:productOrderId', isAuthenticated, async(req, resp, next) =>{
        try {
            const {productOrderId} = req.params
            await deleteProductOrder(productOrderId)
            resp.send('Deleted')
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    })

    nextMain();
};