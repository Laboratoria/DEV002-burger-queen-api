const bcrypt = require('bcryptjs')
const { Pool } = require('pg')
const config = require('../config');
const pool = new Pool({ connectionString: config.dbUrl })

// Funcion para buscar un usuario en específico CON EMAIL
const getUserByUsername = async (username) =>{
    try {
        const client = await pool.connect()
        const query = `
            SELECT 
            * 
            FROM 
            "users" 
            WHERE 
            "username" = '${username}'`
        const res = await client.query(query)
        await client.release()
        return Promise.resolve(res.rows.pop() || "")
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

// Funcion para agregar usuarios
const addUser = async (user) =>{
    try {
        const client = await pool.connect()
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        const query = `
            INSERT INTO 
            users(email, username, password, role) 
            VALUES 
            ('${user.email}', '${user.username}', '${hash}', '${user.role}');`
        const res = await client.query(query)
        await client.release()
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

// Funcion para obtener el listado de todos los usuarios
const getUsersList = async () =>{
    try {
        const client = await pool.connect()
        const query = `
            SELECT 
            * 
            FROM 
            "users"`
        const res = await client.query(query)
        await client.release()
        return Promise.resolve(res.rows)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

// Funcion para buscar un usuario en específico CON EMAIL
const getSpecificUserByEmail = async (email) =>{
    try {
        const client = await pool.connect()
        const query = `
            SELECT 
            * 
            FROM 
            "users" 
            WHERE 
            "email" = '${email}'`
        const res = await client.query(query)
        await client.release()
        return Promise.resolve(res.rows.pop() || "")
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

// Funcion para buscar un usuario en específico CON ID
const getSpecificUserById = async (uid) =>{
    try {
        const client = await pool.connect()
        const query = `
            SELECT 
            * 
            FROM 
            "users" 
            WHERE 
            "uid" = '${uid}'`
        const res = await client.query(query)
        await client.release()
        return Promise.resolve(res.rows.pop() || "")
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    } 
}

// Funcion para actualizar un usuario CON EMAIL
const updateUserByEmail = async (email, user) =>{
    try {
        const client = await pool.connect()
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        const query = `
            UPDATE 
            "users" 
            SET 
            email = '${user.email}', username ='${user.username}', password = '${hash}', role = '${user.role}' 
            WHERE 
            "email" = '${email}'`
        const res = await client.query(query)
        await client.release()
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

// Funcion para actualizar un usuario CON ID
const updateUserByID = async (uid, user) =>{
    try {
        const client = await pool.connect()
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        const query = `
            UPDATE 
            "users" 
            SET 
            email = '${user.email}', username ='${user.username}', password = '${hash}', role = '${user.role}' 
            WHERE 
            "uid" = '${uid}'`
        const res = await client.query(query)
        await client.release()
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

// Funcion para eliminar un usuario CON EMAIL
const deleteUserByEmail = async (email) =>{
    try {
        const client = await pool.connect()
        const query = `
            DELETE FROM 
            "users" 
            WHERE 
            "email" = '${email}'`
        const res = await client.query(query)
        await client.release()
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

// Funcion para eliminar un usuario CON ID
const deleteUserById = async (uid) =>{
    try {
        const client = await pool.connect()
        const query = `
            DELETE FROM 
            "users" 
            WHERE 
            "uid" = '${uid}'`
        const res = await client.query(query)
        await client.release()
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

// Funcion para obtener los clientes
// const getClientList = async () =>{
//     try {
//         const client = await pool.connect()
//         const query = `
//             SELECT 
//             * 
//             FROM 
//             "users"
//             WHERE
//             "role" = "roles"."client"`
//         const res = await client.query(query)
//         await client.release()
//         return Promise.resolve(res.rows)
//     } catch (error) {
//         console.log(error)
//         return Promise.reject(error)
//     }
// }

module.exports = { 
    addUser, getUsersList, 
    getSpecificUserByEmail, 
    getSpecificUserById, 
    updateUserByEmail, 
    updateUserByID, 
    deleteUserByEmail, 
    deleteUserById, 
    getUserByUsername,
}