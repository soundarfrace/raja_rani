const mysql = require('mysql2/promise');

async function initDb() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'NewPassword@123'
    });

    console.log('Creating database rajarani_db if not exists...');
    await connection.query('CREATE DATABASE IF NOT EXISTS rajarani_db;');
    await connection.query('USE rajarani_db;');

    // 1. Products table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        brand VARCHAR(100) NOT NULL,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        old_price DECIMAL(10,2) DEFAULT 0,
        stock INT DEFAULT 0,
        sales INT DEFAULT 0,
        rating DECIMAL(3,1) DEFAULT 4.5,
        reviews_count INT DEFAULT 0,
        energy_stars INT DEFAULT 5,
        in_stock BOOLEAN DEFAULT TRUE,
        image MEDIUMTEXT,
        tag VARCHAR(100),
        status VARCHAR(50) DEFAULT 'Active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Orders table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(50) PRIMARY KEY,
        customer_name VARCHAR(150) NOT NULL,
        customer_email VARCHAR(150) NOT NULL,
        total DECIMAL(10,2) NOT NULL,
        items_count INT DEFAULT 1,
        status VARCHAR(50) DEFAULT 'Processing',
        payment_status VARCHAR(50) DEFAULT 'Paid',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Customers table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        phone VARCHAR(30),
        city VARCHAR(100),
        orders_count INT DEFAULT 0,
        total_spent DECIMAL(10,2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Coupons table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS coupons (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        discount VARCHAR(50) NOT NULL,
        type VARCHAR(50) DEFAULT 'Percentage',
        min_order DECIMAL(10,2) DEFAULT 10000,
        usage_count INT DEFAULT 0,
        status VARCHAR(50) DEFAULT 'Active',
        expiry DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed initial products if table is empty
    const [existing] = await connection.query('SELECT COUNT(*) as cnt FROM products');
    if (existing[0].cnt === 0) {
      console.log('Seeding initial products into MySQL...');
      const sampleProducts = [
        ['Samsung', 'Bespoke 4-Door Flex Refrigerator', 'Refrigerators', 129990, 149990, 18, 142, 4.8, 48, 5, 1, 'photo-1571175443880-49e1d25b2bc5', 'Bestseller', 'Active'],
        ['LG', 'AI Direct Drive Front Load Washer', 'Laundry', 54990, 64990, 24, 98, 4.6, 32, 5, 1, 'photo-1626806787461-102c1bfaaea1', 'Top rated', 'Active'],
        ['Dyson', 'V15 Detect Absolute Cordless Vacuum', 'Floor care', 62900, 69900, 7, 76, 4.9, 19, 5, 1, 'photo-1558317374-067fb5f30001', 'Popular', 'Low Stock'],
        ['Sony', 'BRAVIA 3 4K Ultra HD Smart TV', 'Televisions', 74990, 89990, 12, 110, 4.7, 54, 5, 1, 'photo-1593359677879-a4bb92f829d1', 'Deal', 'Active'],
        ['Voltas', 'Adjustable Inverter Split AC', 'Cooling', 42990, 49990, 3, 85, 4.4, 27, 5, 1, 'photo-1614633833026-062024b42426', 'Limited', 'Low Stock'],
        ['Philips', 'Barista Brew Espresso Machine', 'Kitchen', 21995, 27990, 0, 44, 4.5, 14, 5, 0, 'photo-1517668808822-9ebb02ae2a0e', 'Selling fast', 'Out of Stock'],
        ['Whirlpool', 'IntelliFresh Inverter Refrigerator', 'Refrigerators', 38990, 44990, 15, 62, 4.3, 18, 5, 1, 'photo-1584992236310-6edddc08acff', 'Good value', 'Active'],
        ['Bosch', 'Series 6 Built-in Dishwasher', 'Dishwashers', 67990, 79990, 9, 39, 4.7, 22, 5, 1, 'photo-1585659722983-3a675dabf23d', 'Premium', 'Active']
      ];

      for (const p of sampleProducts) {
        await connection.query(
          `INSERT INTO products (brand, name, category, price, old_price, stock, sales, rating, reviews_count, energy_stars, in_stock, image, tag, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          p
        );
      }
    }

    console.log('Database and schema initialized successfully!');
    await connection.end();
  } catch (err) {
    console.error('Initialization error:', err.message);
  }
}

initDb();
