const {
    isAdmin,
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
    app.post('/orders/:orderId/products/:productId/:qty', isAuthenticated, async(req, resp, next) => {
        try {
            const {orderId, productId, qty} = req.params
            const product = {'order_no': orderId, 'product_id': productId, 'qty': qty} 
            const productAdded = await addProductOrder(product)
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