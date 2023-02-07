const { Pool } = require('pg')
const config = require('../config');
const pool = new Pool({ connectionString: config.dbUrl })

// Función para obtener productOrder
const getProductOrderList = async () =>{
    try {
        const client = await pool.connect()
        const query = `
        SELECT 
        *
        FROM 
        "productorder";`
        const res = await client.query(query)
        await client.end()
        return Promise.resolve(res.rows)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

// Funcion para agregar productorder
const addProductOrder = async (productOrder) =>{
    try {
        const client = await pool.connect()
        const query = `
            INSERT INTO 
            productorder(qty, name) 
            VALUES 
            (${productOrder.qty}, '${productOrder.name}');`
        const res = await client.query(query)
        await client.end()
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

// Funcion para unir tabla orders, productorder y products
const joinProductOrderWOrdersWProducts = async () =>{
    try {
        const client = await pool.connect()
        const query = `
        SELECT 
        "orderid", "client", "products", "qty", "productid", "price", "image", "type", "productdataentry", "status", "orderdataentry", "dataprocessed"
        FROM 
        "orders" 
        INNER JOIN 
        "productorder" 
        ON 
        "orders"."products" = "productorder"."name" 
        INNER JOIN 
        "products"
        ON
        "orders"."products" = "products"."name"`
        const res = await client.query(query)
        await client.end()
        return Promise.resolve(res.rows)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

module.exports = {
    getProductOrderList,
    addProductOrder, 
    joinProductOrderWOrdersWProducts
}