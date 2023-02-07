const {
    isAdmin,
    isAuthenticated
} = require('../middleware/auth');

const { 
    getProductOrderList,
    addProductOrder,
    joinProductOrderWOrdersWProducts
} = require('../controller/productOrder')

module.exports = (app, nextMain) => {
    app.get('/orders/product', isAuthenticated, async(req, resp, next) => {
        try {
            const productOrderList = await getProductOrderList()
            resp.send(productOrderList)
        } catch (error) {
            resp.status(500).send(error) 
        }
    });
    
    /**
     * @name POST /orders/product
     */
    app.post('/orders/product', isAdmin, async(req, resp, next) => {
        try {
            const product = {'qty': req.body.qty, 'name': req.body.name} 
            await addProductOrder(product)
            resp.send('Product added to order')
        } catch (error) {
            console.log(error)
            resp.status(500).send(error) 
        }
    });

    app.get('/orders/product/details', isAuthenticated, async(req, resp, next) => {
        try {
            const joinedOrderList = await joinProductOrderWOrdersWProducts()
            resp.send(joinedOrderList)
        } catch (error) {
            resp.status(500).send(error) 
        }
    });

    nextMain();
};