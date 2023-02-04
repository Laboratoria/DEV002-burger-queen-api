const bcrypt = require('bcryptjs')
const { Client, Pool } = require('pg')
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
        await client.end()
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
        await client.end()
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
        await client.end()
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
        await client.end()
        return Promise.resolve(res.rows)
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
            WHERE "uid" = '${uid}'`
        const res = await client.query(query)
        await client.end()
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
        const query = `
            UPDATE 
            "users" 
            SET 
            email = '${user.email}', username ='${user.username}', password = '${user.password}', role = '${user.role}' 
            WHERE 
            "email" = '${email}'`
        const res = await client.query(query)
        await client.end()
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
        const query = `
            UPDATE 
            "users" 
            SET 
            email = '${user.email}', username ='${user.username}', password = '${user.password}', role = '${user.role}' 
            WHERE 
            "uid" = '${uid}'`
        const res = await client.query(query)
        await client.end()
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
        await client.end()
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
        await client.end()
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

module.exports = { 
    addUser, getUsersList, 
    getSpecificUserByEmail, 
    getSpecificUserById, 
    updateUserByEmail, 
    updateUserByID, 
    deleteUserByEmail, 
    deleteUserById, 
    getUserByUsername 
}

















// module.exports = {
//   getUsers: (req, resp, next) => {
//   },
// };

// // Importamos el modelo de datos y las dependencias necesarias
// const Users = require('../models/users.js')
// const bcrypt = require('bcryptjs')

// // Generamos las rondas de SALT que utilizaremos para encriptar la contraseña
// const SALT = bcrypt.genSaltSync(10)


// // Funcion para obtener el listado de todos los usuarios
// const getUserList = (req, res)=> {
//     Users
//         .find()
//         .then((result)=> {
//             res.json({ success: true, result })
//         })
//         .catch((error)=> {
//             res.json({ success: false, error })
//         })
// }

// // Funcion para buscar un usuario en específico
// const getSpecificUser = (req, res)=> {
//     Users
//         .findOne({ username: req.params.user })
//         .then((result)=> {
//             res.json({ sucess: true, result })
//         })
//         .catch((error)=> {
//             res.json({ success: false, error })
//         })
// }

// // Funcion para registrar un nuevo usuario
// const registerUser = (req, res)=> {
//     // Generamos el objeto que contiene la data a guardar. En el caso de la contraseña
//     // esta se almacena encriptada
//     const data = {
//         email: req.body.email,
//         username: req.body.user,
//         password: bcrypt.hashSync(req.body.password, SALT),
//         admin: req.body.admin
//     }

//     // Creamos una nueva instancia de nuestro modelo de datos para Usuarios con la data
//     // que acabamos de recopilar y la guardamos en la base de datos
//     const user = new Users(data)
//     user
//         .save()
//         .then((result)=> {
//             // Si todo esta bien, se envia una respuesta exitosa
//             res.json({ success: true, msg: 'Documento creado', result })
//         })
//         .catch((error)=> {
//             // De lo contrario, se envia una respuesta informando el error
//             res.status(500).json({ success: false, msg: 'Error creando documento', error })
//         })
// }

// // Funcion para actualizar un usuario
// const updateUser = (req, res)=> {
//     Users
//         .findOneAndUpdate(
//             { username: req.params.user },
//             { $set: req.body }
//         )
//         .then((result)=> {
//             res.json({ success: true, result })
//         })
//         .catch((error)=> {
//             res.json({ success: false, error })
//         })
// }

// // Funcion para eliminar un usuario
// const deleteUser = (req, res)=> {
//     Users
//         .deleteOne({ username: req.params.user })
//         .then((result)=> {
//             res.json({ success: true, result })
//         })
//         .catch((error)=> {
//             res.json({ success: false, error })
//         })
// }

// module.exports = { getUserList, getSpecificUser, registerUser, updateUser, deleteUser }