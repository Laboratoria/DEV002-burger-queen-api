const { Pool } = require('pg')
const config = require('../config');
const pool = new Pool({ connectionString: config.dbUrl })

// Funcion para agregar productorder
const addProductOrder = async (productOrders) =>{
    try {
        const client = await pool.connect()
        const createString = (productOrders) => {
            let query = "INSERT INTO productorder(product_id, order_no, qty) VALUES "
            let index = 0
            productOrders.map(po => {
                query += `(${po.product_id}, ${po.order_no}, ${po.qty}) `
                index++
                if (index < productOrders.length) {
                    query += ","
                }
            })
            query += "RETURNING product_order_id"
            return query
        }
        const query = createString(productOrders)
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