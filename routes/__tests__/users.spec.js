const request = require('supertest');

const {app} = require('../../index');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImVtYWlsIjoiZGdhbGFyY2Vnb256YWxlekBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImRvbXkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzU2OTE0Nzd9.eJ0phA3SiGydV-ewZepwUS4pHI6MJ34FTvuaMmjBgwI'
const email = 'dgalarcegonzalez@gmail.com'

describe('users router', function() {
    it('GET /users', async function() {
        const response = await request(app).get('/users').set('Authorization', `Bearer ${token}`)
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('GET /users/email/:email', async function() {
        const response = await request(app).get(`/users/email/${email}`).set('Authorization', `Bearer ${token}`)
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('POST /users', async function() {
        const user = {'email': 'paraborrar@yafui.com', 'username': 'fuibueno', 'password': 'holahola', 'role': 'waiter'} 
        const response = await request(app).post('/users').set('Authorization', `Bearer ${token}`).send(user)
        expect(response.status).toEqual(200);
        expect(response.text).toBe('User created');
    });

    it('PUT /users/email/:email', async function() {
        const emailEnri = 'lañoraxx@prr.com'
        const user = {'email': 'paté@miaaaauuuuuu.com', 'username': 'paté', 'password': 'holahola', 'role': 'chef'} 
        const response = await request(app).put(`/users/email/${emailEnri}`).set('Authorization', `Bearer ${token}`).send(user)
        expect(response.status).toEqual(200);
        expect(response.text).toBe('User updated');
    });

    it('DELETE /users/email/:email', async function() {
        const email = 'paraborrar@yafui.com'
        const response = await request(app).delete(`/users/email/${email}`).set('Authorization', `Bearer ${token}`)
        expect(response.status).toEqual(200);
        expect(response.text).toBe('User deleted');
    });
});