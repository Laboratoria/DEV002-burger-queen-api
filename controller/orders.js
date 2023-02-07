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
        await client.end()
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
            orders(client, products, status, orderDataEntry, dataProcessed) 
            VALUES 
            ('${order.client}', '${order.products}', '${order.status}', '${order.orderDataEntry}', '${order.dataProcessed}');`
        const res = await client.query(query)
        await client.end()
        return Promise.resolve(res)
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
            WHERE 
            "orderid" = '${orderID}'`
        const res = await client.query(query)
        await client.end()
        return Promise.resolve(res.rows)
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
            client = '${order.client}', products ='${order.products}', status = '${order.status}', orderDataEntry = '${order.orderDataEntry}', dataProcessed = '${order.dataProcessed}' 
            WHERE 
            "orderid" = '${orderID}'`
        const res = await client.query(query)
        await client.end()
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
            "orderid" = '${orderID}'`
        const res = await client.query(query)
        await client.end()
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