DROP TABLE productorder;
DROP TABLE products;
DROP TABLE orders;
DROP TYPE statusenum;
DROP TABLE users;
DROP TYPE roles;

CREATE TYPE roles AS ENUM ('superadmin', 'admin', 'waiter', 'chef', 'client');
CREATE TABLE IF NOT EXISTS users(
    uid serial PRIMARY KEY,
    email VARCHAR(50) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    role roles NOT NULL
);

CREATE TYPE statusenum AS ENUM ('pending', 'canceled', 'delivering', 'delivered');
CREATE TABLE IF NOT EXISTS orders(
    order_no serial PRIMARY KEY,
    client_id INT REFERENCES users(uid) ON DELETE CASCADE ON UPDATE CASCADE,
    status statusenum NOT NULL,
    order_data_entry DATE NOT NULL,
    data_processed DATE 
);

CREATE TABLE IF NOT EXISTS products(
    product_id serial PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price VARCHAR(50) NOT NULL,
    image VARCHAR(150) NOT NULL,
    type VARCHAR(50) NOT NULL,
    product_data_entry DATE 
);

CREATE TABLE IF NOT EXISTS productorder(
    product_order_id serial PRIMARY KEY,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE ON UPDATE CASCADE,
    order_no INT REFERENCES orders(order_no) ON DELETE CASCADE ON UPDATE CASCADE,
    qty INT NOT NULL
);

INSERT INTO users(email, username, password, role) VALUES ('super@admin.com', 'superadmin', '$2a$10$OOSMydd6mcctroE6ZsWHt.hlqOXqKCKYMJyhnCBECXQLr8SSyUwFG', 'superadmin');