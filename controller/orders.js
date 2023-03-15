const { Pool } = require('pg')

const config = require('../config');

const pool = new Pool({ connectionString: config.dbUrl })

// Funcion para obtener el listado de todos los usuarios
const getOrdersList = async () =>{
    try {
        const client = await pool.connect()
        const query = `
        SELECT 
        * 
        FROM 
        "orders"`
        const res = await client.query(query)
        await client.release()
        return Promise.resolve(res.rows)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

// Funcion para agregar ordenes
const addOrder = async (order) =>{
    try {
        const client = await pool.connect()
        const query = `
            INSERT INTO 
            orders(client_name, status, order_data_entry, data_processed) 
            VALUES 
            ('${order.client_name}', '${order.status}', '${order.order_data_entry}', '${order.data_processed}')
            RETURNING
            order_no;`
        const res = await client.query(query)
        await client.release()
        return Promise.resolve(res.rows.pop())
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

// Funcion para buscar una orden en específica CON ID
const getSpecificOrderById = async (orderID) =>{
    try {
        const client = await pool.connect()
        const query = `
            SELECT 
            * 
            FROM 
            "orders" 
            JOIN
            "productorder"
            ON
            "orders"."order_no" = "productorder"."order_no"
            JOIN
            "products"
            ON
            "productorder"."product_id" = "products"."product_id"
            WHERE 
            "orders"."order_no" = '${orderID}'`
        const res = await client.query(query)
        await client.release()
        return Promise.resolve(res.rows || "")
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

// Funcion para actualizar una orden CON ID
const updateOrderByID = async (orderID, order) =>{
    try {
        const client = await pool.connect()
        const query = `
            UPDATE 
            "orders" 
            SET 
            client_name = '${order.client_name}', status = '${order.status}', order_data_entry = '${order.order_data_entry}', data_processed = '${order.data_processed}' 
            WHERE 
            "order_no" = '${orderID}'`
        const res = await client.query(query)
        await client.release()
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

// Funcion para eliminar una orden CON ID
const deleteOrderById = async (orderID) =>{
    try {
        const client = await pool.connect()
        const query = `
            DELETE FROM 
            "orders" 
            WHERE 
            "order_no" = '${orderID}'`
        const res = await client.query(query)
        await client.release()
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

module.exports = { 
    getOrdersList, 
    addOrder, 
    getSpecificOrderById, 
    updateOrderByID, 
    deleteOrderById 
}