const mysql = require('mysql2/promise');

async function setupFullCMS() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'NewPassword@123',
    database: 'rajarani_db'
  });

  console.log('Connected to MySQL rajarani_db.');

  // 1. Categories table
  console.log('Creating categories table...');
  await connection.query(`
    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE,
      slug VARCHAR(100),
      note VARCHAR(255),
      image LONGTEXT,
      display_order INT DEFAULT 0,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // Seed default categories if empty
  const [catRows] = await connection.query('SELECT COUNT(*) as count FROM categories');
  if (catRows[0].count === 0) {
    console.log('Seeding initial categories...');
    const defaultCategories = [
      { name: 'Refrigerators', note: 'A cooler kind of clever', image: 'photo-1571175443880-49e1d25b2bc5', display_order: 1 },
      { name: 'Laundry', note: 'A little less laundry day', image: 'photo-1626806787461-102c1bfaaea1', display_order: 2 },
      { name: 'Kitchen', note: 'Made for the everyday', image: 'photo-1556911220-e15b29be8c8f', display_order: 3 },
      { name: 'Televisions', note: 'Your front-row seat', image: 'photo-1593359677879-a4bb92f829d1', display_order: 4 },
      { name: 'Cooling', note: 'Comfort, considered', image: '/category-cooling.png', display_order: 5 },
      { name: 'Floor care', note: 'A fresher point of view', image: 'photo-1558317374-067fb5f30001', display_order: 6 },
      { name: 'Dishwashers', note: 'More time for everything', image: 'photo-1620626011761-996317b8d101', display_order: 7 },
      { name: 'Small appliances', note: 'Small things, better', image: 'photo-1550583724-b2692b85b150', display_order: 8 },
      { name: 'Water purifiers', note: 'A cleaner kind of clear', image: 'photo-1584622650111-993a426fbf0a', display_order: 9 },
      { name: 'Microwaves', note: 'A fresh take on fast', image: 'photo-1585659722983-3a675dabf23d', display_order: 10 }
    ];
    for (const c of defaultCategories) {
      await connection.query(
        'INSERT INTO categories (name, slug, note, image, display_order) VALUES (?, ?, ?, ?, ?)',
        [c.name, c.name.toLowerCase().replace(/\s+/g, '-'), c.note, c.image, c.display_order]
      );
    }
  }

  // 2. Brands table
  console.log('Creating brands table...');
  await connection.query(`
    CREATE TABLE IF NOT EXISTS brands (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE,
      logo LONGTEXT,
      description VARCHAR(255),
      display_order INT DEFAULT 0,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const [brandRows] = await connection.query('SELECT COUNT(*) as count FROM brands');
  if (brandRows[0].count === 0) {
    console.log('Seeding initial brands...');
    const defaultBrands = ['SAMSUNG', 'LG', 'DYSON', 'BOSCH', 'SONY', 'VOLTAS', 'PHILIPS', 'WHIRLPOOL', 'HAIER', 'PANASONIC', 'PREETHI', 'DELONGHI'];
    for (let i = 0; i < defaultBrands.length; i++) {
      await connection.query('INSERT INTO brands (name, display_order) VALUES (?, ?)', [defaultBrands[i], i + 1]);
    }
  }

  // 3. Website Content (CMS for every word, section, heading, banner, footer)
  console.log('Creating website_content table...');
  await connection.query(`
    CREATE TABLE IF NOT EXISTS website_content (
      id INT AUTO_INCREMENT PRIMARY KEY,
      content_key VARCHAR(100) NOT NULL UNIQUE,
      content_value LONGTEXT NOT NULL,
      section VARCHAR(50) NOT NULL,
      label VARCHAR(255) NOT NULL,
      input_type VARCHAR(30) DEFAULT 'text',
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // Seed default website content
  const defaultContent = [
    // Hero
    { key: 'hero_title', value: 'Upgrade your\neveryday living.', section: 'hero', label: 'Hero Title', type: 'textarea' },
    { key: 'hero_subtitle', value: 'Thoughtfully selected premium electronics and home appliances for the modern Indian home.', section: 'hero', label: 'Hero Subtitle', type: 'textarea' },
    { key: 'hero_button_text', value: 'Explore collection', section: 'hero', label: 'Hero CTA Button Text', type: 'text' },
    { key: 'hero_image', value: '/rajarani-hero.jpg', section: 'hero', label: 'Hero Background Image', type: 'image' },

    // Trust Strip
    { key: 'trust_1', value: 'Considered delivery, on us', section: 'trust_strip', label: 'Trust Item 1', type: 'text' },
    { key: 'trust_2', value: 'Easy 7-day returns', section: 'trust_strip', label: 'Trust Item 2', type: 'text' },
    { key: 'trust_3', value: 'Genuine, guaranteed', section: 'trust_strip', label: 'Trust Item 3', type: 'text' },
    { key: 'trust_4', value: 'Real people, here to help', section: 'trust_strip', label: 'Trust Item 4', type: 'text' },

    // Category Section Headings
    { key: 'cat_eyebrow', value: 'A PLACE FOR EVERYTHING', section: 'homepage_sections', label: 'Category Section Eyebrow', type: 'text' },
    { key: 'cat_title', value: 'Find your kind of better.', section: 'homepage_sections', label: 'Category Section Title', type: 'text' },
    { key: 'cat_link_text', value: 'Explore all categories', section: 'homepage_sections', label: 'Category Link Text', type: 'text' },

    // Catalog Section Headings
    { key: 'catalog_eyebrow', value: 'THOUGHTFULLY CHOSEN FOR HOME', section: 'homepage_sections', label: 'Catalog Section Eyebrow', type: 'text' },
    { key: 'catalog_title', value: 'Products for you.', section: 'homepage_sections', label: 'Catalog Section Title', type: 'text' },
    { key: 'catalog_subtitle', value: 'Appliances that make everyday feel a little easier.', section: 'homepage_sections', label: 'Catalog Section Subtitle', type: 'textarea' },

    // Editorial Experience Banner
    { key: 'editorial_pill', value: 'THE RajaRani LIVING EXPERIENCE', section: 'editorial', label: 'Editorial Pill Tag', type: 'text' },
    { key: 'editorial_badge_count', value: '4,820+ Indian homes styled', section: 'editorial', label: 'Editorial Floating Badge Count', type: 'text' },
    { key: 'editorial_title', value: 'Elevate every corner of your daily sanctuary.', section: 'editorial', label: 'Editorial Title', type: 'textarea' },
    { key: 'editorial_desc', value: 'Appliances engineered for effortless convenience, wrapped in timeless aesthetics. Less noise, zero clutter — only what truly enriches your home life.', section: 'editorial', label: 'Editorial Description', type: 'textarea' },
    { key: 'editorial_stamp_top', value: '100% GENUINE', section: 'editorial', label: 'Editorial Circular Stamp Top', type: 'text' },
    { key: 'editorial_stamp_bottom', value: 'QUALITY GUARANTEE', section: 'editorial', label: 'Editorial Circular Stamp Bottom', type: 'text' },
    { key: 'editorial_image', value: 'photo-1556911220-e15b29be8c8f', section: 'editorial', label: 'Editorial Banner Image', type: 'image' },

    // Promo Card / Banner
    { key: 'promo_badge', value: 'LIMITED SEASON HIGHLIGHT', section: 'promo_card', label: 'Promo Card Badge', type: 'text' },
    { key: 'promo_title', value: 'Pure living,\nsilently refined.', section: 'promo_card', label: 'Promo Card Title', type: 'textarea' },
    { key: 'promo_desc', value: 'Discover our certified quiet collection. Thoughtful kitchen & cooling essentials built to fit seamless into modern Indian homes.', section: 'promo_card', label: 'Promo Card Description', type: 'textarea' },
    { key: 'promo_btn_text', value: 'Explore curated edit', section: 'promo_card', label: 'Promo Card Button Text', type: 'text' },
    { key: 'promo_tag', value: 'Up to 35% off curated range', section: 'promo_card', label: 'Promo Tag / Offer Text', type: 'text' },
    { key: 'promo_image', value: '/rajarani-hero.jpg', section: 'promo_card', label: 'Promo Card Image', type: 'image' },

    // Header & Announcement Bar
    { key: 'announcement_bar', value: 'Special Inaugural Offer: Complimentary Express Delivery across India on orders above ₹10,000', section: 'header', label: 'Top Announcement Bar Text', type: 'text' },
    { key: 'header_brand_first', value: 'Raja', section: 'header', label: 'Brand Name Prefix (Purple)', type: 'text' },
    { key: 'header_brand_second', value: 'Rani', section: 'header', label: 'Brand Name Suffix (Pink)', type: 'text' },

    // Footer
    { key: 'footer_desc', value: 'Better living starts here.\nThoughtfully chosen for the way you live.', section: 'footer', label: 'Footer Brand Description', type: 'textarea' },
    { key: 'footer_note_title', value: 'A BETTER KIND OF HOME', section: 'footer', label: 'Footer Note Eyebrow', type: 'text' },
    { key: 'footer_note_body', value: 'Good design should make everyday feel a little more extraordinary.', section: 'footer', label: 'Footer Note Text', type: 'textarea' },
    { key: 'footer_copyright', value: '© 2025 RajaRani Living Pvt. Ltd.', section: 'footer', label: 'Footer Copyright Line', type: 'text' },
    { key: 'footer_subline', value: 'Thoughtfully selected. Fairly priced. Delivered with care.', section: 'footer', label: 'Footer Tagline Subline', type: 'text' },
    { key: 'contact_email', value: 'hello@rajarani.in', section: 'footer', label: 'Support Email', type: 'text' },
    { key: 'contact_phone', value: '+91 98765 43210', section: 'footer', label: 'Support Phone', type: 'text' }
  ];

  for (const item of defaultContent) {
    await connection.query(`
      INSERT INTO website_content (content_key, content_value, section, label, input_type)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        label = VALUES(label),
        section = VALUES(section),
        input_type = VALUES(input_type);
    `, [item.key, item.value, item.section, item.label, item.type]);
  }

  // 4. Website Settings table
  console.log('Creating website_settings table...');
  await connection.query(`
    CREATE TABLE IF NOT EXISTS website_settings (
      setting_key VARCHAR(100) PRIMARY KEY,
      setting_value LONGTEXT,
      description VARCHAR(255),
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  const defaultSettings = [
    { key: 'site_title', value: 'RajaRani | Premium Electronics & Modern Living', desc: 'Website browser title' },
    { key: 'currency_symbol', value: '₹', desc: 'Default currency symbol' },
    { key: 'free_shipping_threshold', value: '10000', desc: 'Threshold amount in INR for free delivery' },
    { key: 'shipping_fee', value: '499', desc: 'Standard shipping fee in INR' },
    { key: 'maintenance_mode', value: 'false', desc: 'Enable website maintenance mode' }
  ];

  for (const s of defaultSettings) {
    await connection.query(`
      INSERT INTO website_settings (setting_key, setting_value, description)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE description = VALUES(description);
    `, [s.key, s.value, s.desc]);
  }

  console.log('CMS Tables & Data setup successfully completed!');
  await connection.end();
}

setupFullCMS().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
