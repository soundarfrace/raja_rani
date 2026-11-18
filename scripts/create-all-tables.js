const mysql = require('mysql2/promise');

async function createAllTables() {
  const conn = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'NewPassword@123',
    database: 'rajarani_db'
  });

  console.log('Connected to MySQL rajarani_db.');

  // 1. Shipments Table
  console.log('Creating shipments table...');
  await conn.query(`
    CREATE TABLE IF NOT EXISTS shipments (
      id VARCHAR(50) PRIMARY KEY,
      order_id VARCHAR(50) NOT NULL,
      partner VARCHAR(100) NOT NULL,
      awb VARCHAR(100) NOT NULL,
      destination VARCHAR(255) NOT NULL,
      eta VARCHAR(100) NOT NULL,
      status VARCHAR(50) DEFAULT 'In Transit',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // Seed default shipments
  const [shpCount] = await conn.query('SELECT COUNT(*) as cnt FROM shipments');
  if (shpCount[0].cnt === 0) {
    const initialShipments = [
      ['SHP-401', 'ORD-9821', 'BlueDart Express', 'BLD928410294', 'Bandra West, Mumbai', 'Tomorrow, by 2 PM', 'In Transit'],
      ['SHP-400', 'ORD-9820', 'Delhivery Surface', 'DLV883192019', 'Indiranagar, Bengaluru', 'Delivered Today', 'Delivered'],
      ['SHP-399', 'ORD-9819', 'BlueDart Express', 'BLD773829104', 'Navrangpura, Ahmedabad', '18 Nov 2026', 'Out for Delivery'],
      ['SHP-398', 'ORD-9818', 'DTDC Priority', 'DTC492018471', 'Connaught Place, Delhi', 'Delivered 16 Nov', 'Delivered'],
      ['SHP-397', 'ORD-9816', 'Delhivery Surface', 'DLV991029384', 'Kothrud, Pune', '19 Nov 2026', 'In Transit']
    ];
    for (const shp of initialShipments) {
      await conn.query(
        'INSERT INTO shipments (id, order_id, partner, awb, destination, eta, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
        shp
      );
    }
  }

  // 2. Returns Table
  console.log('Creating returns table...');
  await conn.query(`
    CREATE TABLE IF NOT EXISTS returns (
      id VARCHAR(50) PRIMARY KEY,
      order_id VARCHAR(50) NOT NULL,
      customer VARCHAR(100) NOT NULL,
      product VARCHAR(255) NOT NULL,
      reason VARCHAR(255) NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      status VARCHAR(50) DEFAULT 'Inspection Pending',
      requested VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  const [retCount] = await conn.query('SELECT COUNT(*) as cnt FROM returns');
  if (retCount[0].cnt === 0) {
    const initialReturns = [
      ['RET-102', 'ORD-9805', 'Deepak Nair', 'Barista Brew Espresso Machine', 'Packaging damaged in transit', 21995, 'Inspection Pending', '16 Nov 2026'],
      ['RET-101', 'ORD-9792', 'Kavita Menon', 'Series 6 Built-in Dishwasher', 'Size mismatch for modular cabinet', 67990, 'Refund Approved', '14 Nov 2026'],
      ['RET-100', 'ORD-9780', 'Rohan Gupta', 'V15 Detect Absolute Cordless Vacuum', 'Changed mind before unboxing', 62900, 'Completed', '10 Nov 2026']
    ];
    for (const r of initialReturns) {
      await conn.query(
        'INSERT INTO returns (id, order_id, customer, product, reason, amount, status, requested) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        r
      );
    }
  }

  // 3. Warehouses Table
  console.log('Creating warehouses table...');
  await conn.query(`
    CREATE TABLE IF NOT EXISTS warehouses (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      city VARCHAR(150) NOT NULL,
      total_units INT DEFAULT 0,
      capacity_usage VARCHAR(20) DEFAULT '0%',
      manager VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const [whCount] = await conn.query('SELECT COUNT(*) as cnt FROM warehouses');
  if (whCount[0].cnt === 0) {
    const initialWarehouses = [
      ['WH-MUM', 'Mumbai Central Fulfillment Hub', 'Bhiwandi, Maharashtra', 420, '78%', 'Rajesh G.'],
      ['WH-BLR', 'Bengaluru South Tech Logistics', 'Hosur Road, Karnataka', 310, '64%', 'Suresh V.'],
      ['WH-DEL', 'Delhi NCR Northern Mega Hub', 'Gurugram, Haryana', 580, '89%', 'Manoj S.']
    ];
    for (const wh of initialWarehouses) {
      await conn.query(
        'INSERT INTO warehouses (id, name, city, total_units, capacity_usage, manager) VALUES (?, ?, ?, ?, ?, ?)',
        wh
      );
    }
  }

  // 4. Newsletter Subscribers Table
  console.log('Creating newsletter_subscribers table...');
  await conn.query(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 5. Contact Messages Table
  console.log('Creating contact_messages table...');
  await conn.query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255),
      message TEXT NOT NULL,
      status VARCHAR(50) DEFAULT 'Unread',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 6. Product Reviews Table
  console.log('Creating product_reviews table...');
  await conn.query(`
    CREATE TABLE IF NOT EXISTS product_reviews (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT NOT NULL,
      customer_name VARCHAR(100) NOT NULL,
      rating DECIMAL(2,1) NOT NULL,
      comment TEXT,
      is_approved BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('All relational tables created & seeded successfully!');
  await conn.end();
}

createAllTables().catch(err => {
  console.error('Table creation error:', err);
  process.exit(1);
});
