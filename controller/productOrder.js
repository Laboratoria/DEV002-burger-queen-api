const { Pool } = require('pg')
const config = require('../config');
const pool = new Pool({ connectionString: config.dbUrl })

// Funcion para agregar productorder
const addProductOrder = async (productOrder) =>{
    try {
        const client = await pool.connect()
        const query = `
            INSERT INTO 
            productorder(product_id, order_no, qty) 
            VALUES 
            (${productOrder.product_id}, '${productOrder.order_no}', ${productOrder.qty})
            RETURNING
            product_order_id;`
        const res = await client.query(query)
        await client.end()
        return Promise.resolve(res.rows.pop())
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

const deleteProductOrder = async (productOrderID) => {
    try {
        const client = await pool.connect()
        const query = `
            DELETE FROM 
            "productorder" 
            WHERE 
            "product_order_id" = '${productOrderID}'`
        const res = await client.query(query)
        await client.end()
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

module.exports = {
    addProductOrder,
    deleteProductOrder
}