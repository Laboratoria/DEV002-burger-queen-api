const router = require('../../routes/users');

const request = require('supertest');
const assert = require('assert');
const express = require('express');

const app = express();
app.set('config', { adminEmail: "", adminPassword: "" })

describe('GET /users', function() {
    it('responds with json', async function() {
        const hola = () => {}
        const routerTest = router(app, hola)
        const response = await request(routerTest).get('/users')
        console.log(response.body)
        console.log(response.status)
        expect(response.status).toEqual(200);
        expect(response.headers["Content-Type"]).toMatch(/json/);
        expect(response.body.email).toEqual('foo@bar.com');
    });
});