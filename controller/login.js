// Importamos el modelo de datos para los usuarios y las dependencias necesarias
require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const  { getUserByUsername } = require('./users')

const SECRET = process.env.JWT_SECRET

// Logica para la función login
const login = async (req, res)=> {
    // Extraemos desde el body de la peticion el usuario y contraseña
    const username = req.body.username
    const pass = req.body.password

    // Si falta alguno de los campos, enviamos una respuesta informando que son campos requeridos
    if(!username) {
        return res.status(400).send('User name required' )
    }
    if(!pass) {
        return res.status(400).send('Password required')
    }

    const userLoginInfo = await getUserByUsername(username)
    if (!userLoginInfo || !userLoginInfo.password){
        res.status(400).send("User not found.")
    }
    console.log(userLoginInfo)
    if(bcrypt.compareSync(pass, userLoginInfo.password)) {
        const token = jwt.sign({ uid: userLoginInfo.uid, email: userLoginInfo.email, username: userLoginInfo.username, role: userLoginInfo.role }, SECRET);
        res.send(token)
    } else {
        res.status(401).send("Wrong password.")
    }
}

module.exports = { login }