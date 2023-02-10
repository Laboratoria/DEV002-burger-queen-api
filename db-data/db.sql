DROP TABLE users;
DROP TYPE roles;
CREATE TYPE roles AS ENUM ('superadmin', 'admin', 'waiter', 'chef');
CREATE TABLE IF NOT EXISTS users(
    uid serial PRIMARY KEY,
    email VARCHAR(50) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    role roles NOT NULL
);

DROP TABLE orders;
DROP TYPE statusenum;
CREATE TYPE statusenum AS ENUM ('pending', 'canceled', 'delivering', 'delivered');
CREATE TABLE IF NOT EXISTS orders(
    OrderID serial PRIMARY KEY,
    client VARCHAR(50) NOT NULL,
    products VARCHAR(50) NOT NULL,
    status statusenum NOT NULL,
    orderDataEntry DATE NOT NULL,
    dataProcessed DATE 
);

DROP TABLE products;
CREATE TABLE IF NOT EXISTS products(
    productID serial PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price VARCHAR(50) NOT NULL,
    image VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    productDataEntry DATE 
);

DROP TABLE productorder;
CREATE TABLE IF NOT EXISTS productorder(
    productOrderID serial PRIMARY KEY,
    qty INT NOT NULL,
    name VARCHAR(50) NOT NULL
);

INSERT INTO users(email, username, password, role) VALUES ('super@admin.com', 'superadmin', '$2a$10$OOSMydd6mcctroE6ZsWHt.hlqOXqKCKYMJyhnCBECXQLr8SSyUwFG', 'superadmin');