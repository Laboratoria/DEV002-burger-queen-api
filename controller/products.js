const { Pool } = require('pg')

const config = require('../config');

const pool = new Pool({ connectionString: config.dbUrl })

// Funcion para obtener el listado de todos los productos
const getProductsList = async () =>{
    try {
        const client = await pool.connect()
        const query = `
        SELECT 
        * 
        FROM 
        "products"`
        const res = await client.query(query)
        await client.end()
        return Promise.resolve(res.rows)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

// Funcion para agregar productos
const addProduct = async (product) =>{
    try {
        const client = await pool.connect()
        const query = `
            INSERT INTO 
            products(name, price, image, type, product_data_entry) 
            VALUES 
            ('${product.name}', '${product.price}', '${product.image}', '${product.type}', '${product.product_data_entry}')
            RETURNING
            product_id;`
        const res = await client.query(query)
        await client.end()
        return Promise.resolve(res.rows.pop())
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

// Funcion para buscar un producto en específico CON ID
const getSpecificProductById = async (productID) =>{
    try {
        const client = await pool.connect()
        const query = `
            SELECT 
            * 
            FROM 
            "products" 
            WHERE 
            "product_id" = '${productID}'`
        const res = await client.query(query)
        await client.end()
        return Promise.resolve(res.rows.pop() || "")
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

// Funcion para actualizar un producto CON ID
const updateProductByID = async (productID, product) =>{
    try {
        const client = await pool.connect()
        const query = `
            UPDATE 
            "products" 
            SET 
            name = '${product.name}', price ='${product.price}', image = '${product.image}', type = '${product.type}', product_data_entry = '${product.product_data_entry}' 
            WHERE 
            "product_id" = '${productID}'`
        const res = await client.query(query)
        await client.end()
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

// Funcion para eliminar un producto CON ID
const deleteProductById = async (productID) =>{
    try {
        const client = await pool.connect()
        const query = `
            DELETE FROM 
            "products" 
            WHERE 
            "product_id" = '${productID}'`
        const res = await client.query(query)
        await client.end()
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

module.exports = { 
    getProductsList, 
    addProduct, 
    getSpecificProductById, 
    updateProductByID, 
    deleteProductById
}