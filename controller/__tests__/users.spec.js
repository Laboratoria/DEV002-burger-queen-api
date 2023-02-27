jest.setTimeout(10000);

const supertest = require('supertest');

const app = require('../../index');

const request = supertest(app);

const {
  createUser, getUsers, getUserById, putUser, deleteUser
} = require('../users');


const database = 'palvaradoCompany';

beforeAll(async () => {
  await `mongodb://127.0.0.1/${database}`;
});

const admin = {
  email: 'admin@localhost',
  password: 'changeme',
};

const marie = {
  email: 'marie@curie.com',
  password: 'Pa$$word123',
};

const angie = {
  email: 'angie@turner.br',
  password: 'Pa$$word123',
};

const carolyn = {
  email: 'carolyn@parker.es',
  password: 'Pa$$word123',
};

// describe('getUsers', () => {
//   it('should be a function', () => {
//     expect(typeof getUsers).toBe('function');
//   });
//   it('should get users collection', (done) => {
//     done();
//   });
// });

// createUser
describe('POST/users: create a user', () => {
  it('should be a function', () => {
    expect(typeof createUser).toBe('function');
  });
  it('should return status code 200 if a new user is created', (done) => {
    request.post('/auth').send(admin).then((response) => {
      const token = response.body.token;
      request.post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send(marie)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body.email).toBeTruthy();
          expect(response.body.password).toBeTruthy();
          expect(response.body._id).toBeTruthy();
          done();
        });
    });
  });
  it('should return status code 200 if a new user is created', (done) => {
    request.post('/auth').send(admin).then((response) => {
      const token = response.body.token;
      request.post('/users').set('Authorization', `Bearer ${token}`)
        .send(carolyn)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.email).toBeTruthy();
          expect(response.body.password).toBeTruthy();
          expect(response.body._id).toBeTruthy();
          done();
        });
    });
  });
  it('should return status code 200 if a new user is created', (done) => {
    request.post('/auth').send(admin).then((response) => {
      const token = response.body.token;
      request.post('/users').set('Authorization', `Bearer ${token}`)
        .send(angie)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.email).toBeTruthy();
          expect(response.body.password).toBeTruthy();
          expect(response.body._id).toBeTruthy();
          request.delete(`/users/${response.body._id}`).set('Authorization', `Bearer ${token}`)
            .send(angie).expect('Content-Type', /json/)
            .expect(200)
            .then(() => done());
        });
    });
  });
  it('should return status code 403 if the user provided already exists', (done) => {
    request.post('/auth').send(admin).then((response) => {
      const token = response.body.token;
      request.post('/users').set('Authorization', `Bearer ${token}`)
        .send(marie)
        .expect('Content-Type', /json/)
        .expect(403)
        .then((response) => {
          expect(response.body).toEqual({ message: 'marie@curie.com has already been registered. Please use a different email address' });
          done();
        });
    });
  });
  it('should return status code 400 if an incorrect format of email or password is provided', (done) => {
    request.post('/auth').send(admin).then((response) => {
      const token = response.body.token;
      request.post('/users').set('Authorization', `Bearer ${token}`)
        .send({ email: 'a', password: '1' })
        .expect('Content-Type', /json/)
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({ message: 'Email or password has invalid format' });
          done();
        });
    });
  });
  it('should return status code 400 if wrong email or password is provided', (done) => {
    request.post('/auth').send(admin).then((response) => {
      const token = response.body.token;
      request.post('/users').set('Authorization', `Bearer ${token}`)
        .send({ email: 'algo@example.com', password: '1' })
        .expect('Content-Type', /json/)
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({ message: 'Email or password has invalid format' });
          done();
        });
    });
  });
  it('should return status code 400 if email or password is missing', (done) => {
    request.post('/auth').send(admin).then((response) => {
      const token = response.body.token;
      request.post('/users').set('Authorization', `Bearer ${token}`)
        .send({ email: 'algo@example.com' })
        .expect('Content-Type', /json/)
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({ message: 'Neither email nor password was provided' });
          done();
        });
    });
  });
});

// getUsers
describe('GET/users: user list', () => {
  it('should be a function', () => {
    expect(typeof getUsers).toBe('function');
  });
  it('should return all users', (done) => {
    request.post('/auth').send(admin).then((response) => {
      const token = response.body.token;
      request.get('/users').set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        //.expect({ message: 'Successful operation' })
        .then((response) => {
          expect(Array.isArray(response.body)).toBeTruthy();
          // expect(res.body.message).toBe('Successful operation');
          done();
        });
    });
  });
  it('should return status code 403 if the user is not admin', (done) => {
    request.post('/auth').send(marie).then((response) => {
      const token = response.body.token;
      request.get('/users').set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(403)
        .then((response) => {
          expect(response.body.message).toEqual('Forbidden');
          done();
        });
    });
  });
});

// getUserById
describe('GET/users/{uid}', () => {
  it('should be a function', () => {
    expect(typeof getUserById).toBe('function');
  });
  it('should return a user with email', (done) => {
    request.post('/auth').send(carolyn).then((response) => {
      const token = response.body.token;
      request.get(`/users/${carolyn.email}`).set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.email).toBeTruthy();
          expect(response.body.password).toBeTruthy();
          expect(response.body._id).toBeTruthy();
          done();
        });
    });
  });
  it('should return status code 404 if yhe user doesnt exist', (done) => {
    request.post('/auth').send(admin).then((response) => {
      const token = response.body.token;
      request.get('/users/algo@fail.com').set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({ message: 'User with id algo@fail.com could not be found' });
          done();
        });
    });
  });
  it('should return status code 403 if user is not admin', (done) => {
    request.post('/auth').send(carolyn).then((response) => {
      const token = response.body.token;
      request.get(`/users/${marie.email}`).set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(403)
        .then(() => done());
    });
  });
});

// putUser
describe('PUT/Users/{uid}: modify a user', () => {
  it('should be a function', () => {
    expect(typeof putUser).toBe('function');
  });
  it('should return status code 404 if email doesnt exist', (done) => {
    request.post('/auth').send(admin).then((response) => {
      const token = response.body.token;
      request.put('/users/algo@fail.com').set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({ message: 'User with id algo@fail.com could not be found' });
          done();
        });
    });
  });
  it('should return status code 403 if uid hasnt admin rol or isnt an owner', (done) => {
    request.post('/auth').send(carolyn).then((response) => {
      const token = response.body.token;
      request.put(`/users/${admin.email}`).set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(403)
        .then((response) => {
          expect(response.body).toEqual({ message: 'Admin permission is required, or you need to be the owner' });
          done();
        });
    });
  });
  it('should return status code 403 is user doesnt have an admin role', (done) => {
    request.post('/auth').send(carolyn).then((response) => {
      const token = response.body.token;
      request.put(`/users/${carolyn.email}`).set('Authorization', `Bearer ${token}`)
        .send({ roles: { admin: true } })
        .expect('Content-Type', /json/)
        .expect(403)
        .then((response) => {
          expect(response.body).toEqual({ message: 'Modifying roles value requires admin permission' });
          done();
        });
    });
  });
  it('should return status code 400 if email or password is missing', (done) => {
    request.post('/auth').send(carolyn).then((response) => {
      const token = response.body.token;
      request.put(`/users/${carolyn.email}`).set('Authorization', `Bearer ${token}`)
        .send({})
        .expect('Content-Type', /json/)
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({ message: 'Neither email nor password was provided' });
          done();
        });
    });
  });
  it('should return 400 the email provided has a wrong format', (done) => {
    request.post('/auth').send(carolyn).then((response) => {
      const token = response.body.token;
      request.put(`/users/${carolyn.email}`).set('Authorization', `Bearer ${token}`)
        .send({ email: 'a' })
        .expect('Content-Type', /json/)
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({ message: 'Email field has invalid format' });
          done();
        });
    });
  });
  it('should return status code 400 if wrong format of password or email is provided', (done) => {
    request.post('/auth').send(carolyn).then((response) => {
      const token = response.body.token;
      request.put(`/users/${carolyn.email}`).set('Authorization', `Bearer ${token}`)
        .send({ email: 'algo@algo.com', password: '1' })
        .expect('Content-Type', /json/)
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({ message: 'Password field has invalid format' });
          done();
        });
    });
  });
  it('should return status code 200 if updated user is correct', (done) => {
    request.post('/auth').send(carolyn).then((response) => {
      const token = response.body.token;
      request.put(`/users/${carolyn.email}`).set('Authorization', `Bearer ${token}`)
        .send({ email: 'carolyn@parker.es' })
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body.password).toBeTruthy();
          expect(response.body.roles).toBeTruthy();
          expect(response.body.email).toEqual('carolyn@parker.es');
          done();
        });
    });
  });
  it('should return status code 200 if updated user is correct', (done) => {
    request.post('/auth').send(admin).then((response) => {
      const token = response.body.token;
      request.put('/users/carolyn@parker.es').set('Authorization', `Bearer ${token}`)
        .send({ roles: { admin: true } })
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body.email).toBeTruthy();
          expect(response.body.password).toBeTruthy();
          expect(response.body.roles.admin).toBe(true);
          done();
        });
    });
  });
});

// deleteUser
describe('DELETE/users/{uid}: delete a user', () => {
  it('should be a function', () => {
    expect(typeof deleteUser).toBe('function');
  });
  it('should return status code 403 if user doesnt have and admin role', (done) => {
    request.post('/auth').send(marie).then((response) => {
      const token = response.body.token;
      request.delete(`/users/${admin.email}`).set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(403)
        .then((response) => {
          expect(response.body).toEqual({ message: 'Admin permission is required, or you need to be the owner' });
          done();
        });
    });
  });
  it('should return status code 403 if user doesnt have an admin role', (done) => {
    request.post('/auth').send(marie).then((response) => {
      const token = response.body.token;
      request.delete('/users/algo@fail.com').set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({ message: 'User with id algo@fail.com could not be found' });
          done();
        });
    });
  });
  it('should return status code 200 if user was deleted', (done) => {
    request.post('/auth').send(admin).then((response) => {
      const token = response.body.token;
      request.delete('/users/carolyn@parker.es').set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.email).toBeTruthy();
          expect(response.body.password).toBeTruthy();
          expect(response.body._id).toBeTruthy();
          done();
        });
    });
  });
  it('should return status code 200 if user was deleted', (done) => {
    request.post('/auth').send(admin).then((response) => {
      const token = response.body.token;
      request.delete(`/users/${marie.email}`).set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.email).toBeTruthy();
          expect(response.body.password).toBeTruthy();
          expect(response.body._id).toBeTruthy();
          done();
        });
    });
  });
});
