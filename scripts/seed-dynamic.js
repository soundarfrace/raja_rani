const mysql = require('mysql2/promise');

const fullProducts = [
  ['Samsung', 'Bespoke 4-Door Flex Refrigerator', 'Refrigerators', 129990, 159990, '/products/fridge-samsung.jpg', 'Bestseller'],
  ['LG', 'AI Direct Drive Front Load Washer', 'Laundry', 54990, 69990, '/products/washer-lg.jpg', 'Top rated'],
  ['Dyson', 'V15 Detect Absolute Cordless Vacuum', 'Floor care', 62900, 71900, '/products/vacuum-dyson.jpg', 'Editor’s pick'],
  ['Bosch', 'Series 6 Built-in Dishwasher', 'Dishwashers', 67990, 82990, '/products/dishwasher-bosch.jpg', 'Quiet favourite'],
  ['Sony', 'BRAVIA 3 4K Ultra HD Smart TV', 'Televisions', 74990, 99990, '/products/tv-sony.jpg', 'Bestseller'],
  ['Voltas', 'Adjustable Inverter Split AC', 'Cooling', 42990, 55990, '/products/ac-voltas.jpg', 'Summer essential'],
  ['Philips', 'Barista Brew Espresso Machine', 'Kitchen', 21995, 27995, '/products/espresso-philips.jpg', 'New arrival'],
  ['Whirlpool', 'IntelliFresh Double Door Fridge', 'Refrigerators', 38990, 48990, '/products/fridge-whirlpool.jpg', 'Value pick'],
  ['Haier', '8kg Inverter Front Load Washer', 'Laundry', 35990, 44990, '/products/washer-haier.jpg', 'Energy Saver'],
  ['Samsung', 'Neo QLED 4K Smart TV, 55”', 'Televisions', 119990, 149990, '/products/tv-samsung.jpg', 'Premium'],
  ['Philips', 'Airfryer & Multi-Cooker XXL', 'Kitchen', 14995, 18995, '/products/airfryer-philips.jpg', 'Staff pick'],
  ['Bosch', 'Series 4 Front Load Washer', 'Laundry', 46990, 58990, '/products/washer-bosch.jpg', 'Reliable'],
  ['LG', 'Convertible 6-in-1 Split AC', 'Cooling', 51990, 64990, '/products/ac-lg.jpg', 'Smart AI'],
  ['Dyson', 'Purifier Cool Gen1 Tower', 'Small appliances', 39900, 49900, '/products/purifier-dyson.jpg', 'Air Pure'],
  ['Panasonic', '2-in-1 UV Water Purifier', 'Water purifiers', 18990, 24990, '/products/water-panasonic.jpg', 'Pure Water'],
  ['Samsung', 'Bespoke Counter Refrigerator', 'Refrigerators', 49990, 62990, '/products/fridge-samsung-bespoke.jpg', 'Sleek'],
  ['Philips', 'Daily Collection Pop-up Toaster', 'Kitchen', 3490, 4490, '/products/toaster-philips.jpg', 'Breakfast pick'],
  ['Whirlpool', 'Magicook Pro Convection Microwave', 'Microwaves', 12990, 16990, '/products/microwave-whirlpool.jpg', 'Quick Cook'],
  ['Bosch', 'Series 8 Fully Integrated Dishwasher', 'Dishwashers', 89990, 109990, '/products/dishwasher-bosch-s8.jpg', 'Luxury'],
  ['Preethi', 'Power Blender & Mixer Grinder', 'Kitchen', 6995, 8995, '/products/blender-preethi.jpg', 'Durable'],
  ['Morphy Richards', 'Electric Glass Kettle, 1.7L', 'Small appliances', 2490, 3290, '/products/kettle-morphy.jpg', 'Compact'],
  ['Voltas', 'Pure Air Inverter AC', 'Cooling', 36990, 47990, '/products/ac-voltas-pure.jpg', 'Cool & Clean'],
  ['Dyson', 'V8 Slim Fluffy Cordless Vacuum', 'Floor care', 34900, 41900, '/products/vacuum-dyson-v8.jpg', 'Lightweight'],
  ['Philips', 'EasySpeed Steam Iron 2000W', 'Small appliances', 2290, 2990, '/products/iron-philips.jpg', 'Essential'],
  ['Panasonic', 'Convection Microwave Oven, 27L', 'Microwaves', 15490, 19990, '/products/microwave-panasonic.jpg', 'Chef pick'],
  ['DeLonghi', 'Magnifica S Automatic Espresso', 'Kitchen', 54990, 68990, '/products/espresso-delonghi.jpg', 'Coffee bar'],
  ['LG', 'PuriCare Tankless Water Purifier', 'Water purifiers', 24990, 31990, '/products/water-lg.jpg', 'Mineral rich'],
  ['Bosch', 'Series 6 Bagless Vacuum Cleaner', 'Floor care', 17990, 22990, '/products/vacuum-bosch.jpg', 'High power'],
  ['Prestige', 'Induction Cooktop & Kettle Combo', 'Kitchen', 4990, 6990, '/products/induction-prestige.jpg', 'Combo deal'],
  ['Philips', '800 Series Air Purifier', 'Small appliances', 16995, 21995, '/products/purifier-philips.jpg', 'Clean Air']
];

async function seed() {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'NewPassword@123',
    database: 'rajarani_db'
  });

  console.log('Clearing and seeding all 30 products into MySQL...');
  await conn.query('TRUNCATE TABLE products;');

  for (let i = 0; i < fullProducts.length; i++) {
    const p = fullProducts[i];
    const brand = p[0];
    const name = p[1];
    const category = p[2];
    const price = p[3];
    const oldPrice = p[4];
    const image = p[5];
    const tag = p[6] || null;
    const rating = +(4.2 + (i % 8) * 0.1).toFixed(1);
    const reviews = 48 + (i * 137) % 950;
    const energyStars = 3 + (i % 3);
    const inStock = i % 8 !== 0;
    const stock = inStock ? 10 + (i * 3) : 0;
    const sales = 25 + (i * 7);
    const status = stock === 0 ? 'Out of Stock' : stock < 5 ? 'Low Stock' : 'Active';

    await conn.query(
      `INSERT INTO products 
       (brand, name, category, price, old_price, stock, sales, rating, reviews_count, energy_stars, in_stock, image, tag, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [brand, name, category, price, oldPrice, stock, sales, rating, reviews, energyStars, inStock, image, tag, status]
    );
  }

  // Also seed initial orders if empty
  const [orderCount] = await conn.query('SELECT COUNT(*) as cnt FROM orders');
  if (orderCount[0].cnt === 0) {
    const sampleOrders = [
      ['ORD-9821', 'Priya Sharma', 'priya.s@example.com', 129990, 1, 'Processing', 'Paid'],
      ['ORD-9820', 'Rahul Verma', 'rahul.v@example.com', 54990, 1, 'Delivered', 'Paid'],
      ['ORD-9819', 'Sneha Patel', 'sneha.p@example.com', 21995, 2, 'Shipped', 'Paid'],
      ['ORD-9818', 'Amit Kumar', 'amit.k@example.com', 62900, 1, 'Delivered', 'Paid'],
      ['ORD-9817', 'Ananya Roy', 'ananya.r@example.com', 74990, 1, 'Cancelled', 'Refunded'],
      ['ORD-9816', 'Vikram Joshi', 'vikram.j@example.com', 42990, 1, 'Shipped', 'Paid']
    ];
    for (const o of sampleOrders) {
      await conn.query(
        'INSERT INTO orders (id, customer_name, customer_email, total, items_count, status, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?)',
        o
      );
    }
  }

  // Seed customers
  const [custCount] = await conn.query('SELECT COUNT(*) as cnt FROM customers');
  if (custCount[0].cnt === 0) {
    const sampleCust = [
      ['Priya Sharma', 'priya.s@example.com', '+91 98201 22334', 'Mumbai', 5, 284950],
      ['Rahul Verma', 'rahul.v@example.com', '+91 98450 11223', 'Bengaluru', 3, 112480],
      ['Sneha Patel', 'sneha.p@example.com', '+91 98791 55667', 'Ahmedabad', 8, 340200],
      ['Amit Kumar', 'amit.k@example.com', '+91 98110 99887', 'Delhi', 2, 78900],
      ['Vikram Joshi', 'vikram.j@example.com', '+91 98220 44556', 'Pune', 4, 195000]
    ];
    for (const c of sampleCust) {
      await conn.query(
        'INSERT INTO customers (name, email, phone, city, orders_count, total_spent) VALUES (?, ?, ?, ?, ?, ?)',
        c
      );
    }
  }

  // Seed coupons
  const [couponCount] = await conn.query('SELECT COUNT(*) as cnt FROM coupons');
  if (couponCount[0].cnt === 0) {
    const sampleCoupons = [
      ['WELCOME10', '10%', 'Percentage', 5000, 142, 'Active', '2026-12-31'],
      ['FESTIVE2500', '₹2,500 OFF', 'Fixed Amount', 25000, 89, 'Active', '2026-11-30'],
      ['FIRSTHOME', '15%', 'First Order', 10000, 312, 'Active', '2026-12-31'],
      ['SUMMERCOOL', '₹3,000 OFF', 'Category Specific', 35000, 64, 'Active', '2026-06-30']
    ];
    for (const cp of sampleCoupons) {
      await conn.query(
        'INSERT INTO coupons (code, discount, type, min_order, usage_count, status, expiry) VALUES (?, ?, ?, ?, ?, ?, ?)',
        cp
      );
    }
  }

  const [res] = await conn.query('SELECT COUNT(*) as cnt FROM products');
  console.log(`Seeded successfully! Total products in MySQL: ${res[0].cnt}`);
  await conn.end();
}

seed();
