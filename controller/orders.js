const { Client } = require('pg')
const config = require('../config');
const pgClient = new Client({ connectionString: config.dbUrl });

// Funcion para obtener el listado de todos los usuarios
const getOrdersList = async () =>{
    try {
        await pgClient.connect()
        const query = `
        SELECT 
        * 
        FROM 
        "orders"`
        const res = await pgClient.query(query)
        await pgClient.end()
        return Promise.resolve(res.rows)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    } finally {
        await pgClient.end();
    }
}

// Funcion para agregar ordenes
const addOrder = async (order) =>{
    try {
        await pgClient.connect()
        const query = `
            INSERT INTO 
            orders(client, products, status, dataEntry, dataProcessed) 
            VALUES 
            ('${order.client}', '${order.products}', '${order.status}', '${order.dataEntry}', '${order.dataProcessed}');`
        const res = await pgClient.query(query)
        await pgClient.end()
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    } finally {
        await pgClient.end();
    }
}

// Funcion para buscar una orden en específica CON ID
const getSpecificOrderById = async (orderID) =>{
    try {
        await pgClient.connect()
        const query = `
            SELECT 
            * 
            FROM 
            "orders" 
            WHERE 
            "orderid" = '${orderID}'`
        const res = await pgClient.query(query)
        await pgClient.end()
        return Promise.resolve(res.rows)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    } finally {
        await pgClient.end();
    }
}

// Funcion para actualizar una orden CON ID
const updateOrderByID = async (orderID, order) =>{
    try {
        await pgClient.connect()
        const query = `
            UPDATE 
            "orders" 
            SET 
            client = '${order.client}', products ='${order.products}', status = '${order.status}', dataEntry = '${order.dataEntry}', dataProcessed = '${order.dataProcessed}' 
            WHERE 
            "orderid" = '${orderID}'`
        const res = await pgClient.query(query)
        await pgClient.end()
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    } finally {
        await pgClient.end();
    }
}

// Funcion para eliminar una orden CON ID
const deleteOrderById = async (orderID) =>{
    try {
        await pgClient.connect()
        const query = `
            DELETE FROM 
            "orders" 
            WHERE 
            "orderid" = '${orderID}'`
        const res = await pgClient.query(query)
        await pgClient.end()
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    } finally {
        await pgClient.end();
    }
}

module.exports = { getOrdersList, addOrder, getSpecificOrderById, updateOrderByID, deleteOrderById }