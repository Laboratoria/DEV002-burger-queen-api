const { Client } = require('pg')
const config = require('../config');
const pgClient = new Client({ connectionString: config.dbUrl });

// Funcion para obtener el listado de todos los productos
const getProductsList = async () =>{
    try {
        await pgClient.connect()
        const query = `
        SELECT 
        * 
        FROM 
        "products"`
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

// Funcion para agregar productos
const addProduct = async (product) =>{
    try {
        await pgClient.connect()
        const query = `
            INSERT INTO 
            products(name, price, image, type, dataEntry) 
            VALUES 
            ('${product.name}', '${product.price}', '${product.image}', '${product.type}', '${product.dataEntry}');`
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

// Funcion para buscar un producto en específico CON ID
const getSpecificProductById = async (productID) =>{
    try {
        await pgClient.connect()
        const query = `
            SELECT 
            * 
            FROM 
            "products" 
            WHERE 
            "productid" = '${productID}'`
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

// Funcion para actualizar un producto CON ID
const updateProductByID = async (productID, product) =>{
    try {
        await pgClient.connect()
        const query = `
            UPDATE 
            "products" 
            SET 
            name = '${product.name}', price ='${product.price}', image = '${product.image}', type = '${product.type}', dataEntry = '${product.dataEntry}' 
            WHERE 
            "productid" = '${productID}'`
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

// Funcion para eliminar un producto CON ID
const deleteProductById = async (productID) =>{
    try {
        await pgClient.connect()
        const query = `
            DELETE FROM 
            "products" 
            WHERE 
            "productid" = '${productID}'`
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

module.exports = { getProductsList, addProduct, getSpecificProductById, updateProductByID, deleteProductById }