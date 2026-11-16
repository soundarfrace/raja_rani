export interface SubCategory {
  title: string
  items: string[]
}

export interface NavCategory {
  id: string
  name: string
  columns: SubCategory[]
}

export const NAV_CATEGORIES: NavCategory[] = [
  {
    id: 'popular',
    name: 'Popular',
    columns: [
      {
        title: 'Trending',
        items: ['All Popular', 'Top Deals', 'Daily Specials', 'New In', 'Best Sellers']
      },
      {
        title: 'Budget Buys',
        items: ['Under ₹199', 'Under ₹299', 'Under ₹499', 'Under ₹999']
      }
    ]
  },
  {
    id: 'kurti-saree-lehenga',
    name: 'Kurti, Saree & Lehenga',
    columns: [
      {
        title: 'All Sarees',
        items: ['View All', 'Silk Sarees', 'Cotton Sarees', 'Georgette Sarees', 'Chiffon Sarees', 'Satin Sarees', 'Embroidered Sarees']
      },
      {
        title: 'Kurtis & Kurta Sets',
        items: ['View All', 'Anarkali Kurtis', 'Straight Kurtis', 'A-Line Kurtis', 'Kurta Sets with Dupatta', 'Palazzo Sets']
      },
      {
        title: 'Suits & Dress Material',
        items: ['View All', 'Cotton Suits', 'Silk Suits', 'Chanderi Suits', 'Unstitched Fabric']
      },
      {
        title: 'Lehengas',
        items: ['View All', 'Bridal Lehengas', 'Semi-Stitched Lehengas', 'Floral Lehengas', 'Party Wear Lehengas']
      },
      {
        title: 'Ethnic Bottomwear',
        items: ['Leggings', 'Palazzos', 'Shararas', 'Salwars', 'Petticoats']
      }
    ]
  },
  {
    id: 'women-western',
    name: 'Women Western',
    columns: [
      {
        title: 'Topwear',
        items: ['View All', 'Tops & Tunics', 'T-Shirts & Polos', 'Shirts', 'Dresses', 'Jumpsuits']
      },
      {
        title: 'Bottomwear',
        items: ['View All', 'Jeans & Jeggings', 'Trousers & Pants', 'Skirts', 'Shorts', 'Track Pants']
      },
      {
        title: 'Winterwear',
        items: ['View All', 'Jackets & Coats', 'Sweaters & Cardigans', 'Sweatshirts & Hoodies', 'Shrugs']
      },
      {
        title: 'Innerwear & Loungewear',
        items: ['Nightsuits', 'Sleepwear & Robes', 'Thermal Wear', 'Camisoles']
      }
    ]
  },
  {
    id: 'lingerie',
    name: 'Lingerie',
    columns: [
      {
        title: 'Bras',
        items: ['View All', 'T-Shirt Bras', 'Padded Bras', 'Sports Bras', 'Strapless Bras', 'Push Up Bras']
      },
      {
        title: 'Panties',
        items: ['View All', 'Cotton Panties', 'Seamless Panties', 'Briefs & Hipsters', 'Thongs & Bikini Panties']
      },
      {
        title: 'Shapewear & Sets',
        items: ['Tummy Tuckers', 'Body Shapers', 'Bra & Panty Sets', 'Bridal Lingerie']
      },
      {
        title: 'Sleepwear',
        items: ['Babydolls', 'Satin Nightdresses', 'Nighty & Gowns', 'Lounge Sets']
      }
    ]
  },
  {
    id: 'men',
    name: 'Men',
    columns: [
      {
        title: 'Top Wear',
        items: ['View All', 'T-Shirts', 'Casual Shirts', 'Formal Shirts', 'Polo T-Shirts', 'Kurtas']
      },
      {
        title: 'Bottom Wear',
        items: ['View All', 'Jeans', 'Casual Trousers', 'Formal Trousers', 'Track Pants', 'Shorts & 3/4ths']
      },
      {
        title: 'Ethnic Wear',
        items: ['Kurta Sets', 'Nehru Jackets', 'Sherwanis', 'Dhotis']
      },
      {
        title: 'Innerwear',
        items: ['Vests', 'Briefs & Trunks', 'Boxers', 'Thermal Wear']
      },
      {
        title: 'Men Accessories',
        items: ['Belts', 'Wallets', 'Caps & Hats', 'Ties & Cufflinks', 'Sunglasses']
      }
    ]
  },
  {
    id: 'kids-toys',
    name: 'Kids & Toys',
    columns: [
      {
        title: 'Boys Clothing',
        items: ['T-Shirts & Shirts', 'Jeans & Trousers', 'Ethnic Wear', 'Shorts', 'Clothing Sets']
      },
      {
        title: 'Girls Clothing',
        items: ['Dresses & Frocks', 'Tops & Tees', 'Lehenga Choli', 'Kurti Sets', 'Skirts & Shorts']
      },
      {
        title: 'Baby Care & Infant',
        items: ['Rompers & Sleepsuits', 'Baby Bedding', 'Baby Feeding', 'Diapers & Wipes']
      },
      {
        title: 'Toys & Games',
        items: ['Soft Toys', 'Board Games', 'Action Figures', 'Educational Toys', 'Remote Control Toys']
      }
    ]
  },
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    columns: [
      {
        title: 'Home Furnishing',
        items: ['Bedsheets', 'Curtains & Drapes', 'Cushion Covers', 'Blankets & Quilts', 'Carpets & Rugs']
      },
      {
        title: 'Kitchen & Dining',
        items: ['Cookware Sets', 'Dinner Sets', 'Kitchen Storage & Containers', 'Bottles & Flasks', 'Lunch Boxes']
      },
      {
        title: 'Home Decor',
        items: ['Wall Clocks', 'Wall Art & Paintings', 'Showpieces & Figurines', 'Lighting & Lamps', 'Flower Vases']
      },
      {
        title: 'Appliances',
        items: ['Blenders & Mixers', 'Electric Kettles', 'Air Fryers', 'Irons', 'Induction Cooktops']
      }
    ]
  },
  {
    id: 'beauty-health',
    name: 'Beauty & Health',
    columns: [
      {
        title: 'Make Up',
        items: ['Lipstick & Lip Gloss', 'Eye Liner & Kajal', 'Foundations & Compact', 'Nail Polish', 'Makeup Brushes']
      },
      {
        title: 'Skincare',
        items: ['Face Wash & Cleansers', 'Moisturizers & Creams', 'Sunscreen', 'Face Serums', 'Face Masks']
      },
      {
        title: 'Haircare',
        items: ['Shampoo & Conditioners', 'Hair Oils', 'Hair Serums', 'Hair Styling & Color']
      },
      {
        title: 'Fragrances & Personal Care',
        items: ['Perfumes & Body Mists', 'Deodorants', 'Body Lotions', 'Oral Care', 'Bath & Shower']
      }
    ]
  },
  {
    id: 'jewellery-accessories',
    name: 'Jewellery & Accessories',
    columns: [
      {
        title: 'Jewellery Sets',
        items: ['Kundan Sets', 'Temple Jewellery', 'Oxidised Sets', 'American Diamond Sets', 'Choker Sets']
      },
      {
        title: 'Earrings & Rings',
        items: ['Jhumkas', 'Studs & Tops', 'Drop & Danglers', 'Finger Rings', 'Nosepins']
      },
      {
        title: 'Necklaces & Bangles',
        items: ['Pendant Necklaces', 'Mangalsutras', 'Bangles & Bracelets', 'Anklets & Payals']
      },
      {
        title: 'Women Accessories',
        items: ['Hair Accessories', 'Saree Pins & Brooches', 'Umbrellas', 'Scarves & Stoles']
      }
    ]
  },
  {
    id: 'bags-footwear',
    name: 'Bags & Footwear',
    columns: [
      {
        title: 'Women Footwear',
        items: ['View All', 'Heels and Sandals', 'Flats', 'Boots', 'Flipflops & Slippers', 'Bellies and Ballerinas']
      },
      {
        title: 'Men Footwear',
        items: ['View All', 'Men Casual Shoes', 'Men Sports Shoes', 'Men Flip Flops and Sandals', 'Men Formal Shoes', 'Loafers']
      },
      {
        title: 'Kids Footwear',
        items: ['View All', 'Boys Shoes', 'Girls Shoes', 'Casual Shoes', 'Flipflops & Slippers', 'Sandals']
      },
      {
        title: 'Women Bags',
        items: ['View All', 'Backpacks', 'Handbags', 'Slingbags', 'Wallets', 'Clutches']
      },
      {
        title: 'Men Bags',
        items: ['Backpacks', 'Waist Bags', 'Crossbody Bags & Sling Bags']
      },
      {
        title: 'Travel Bags, Luggage and Accessories',
        items: ['View All', 'Duffel & Trolley Bags', 'Laptop & Messenger Bags']
      }
    ]
  },
  {
    id: 'electronics',
    name: 'Electronics',
    columns: [
      {
        title: 'Mobile Accessories',
        items: ['Phone Covers & Cases', 'Screen Protectors', 'Mobile Chargers & Cables', 'Power Banks', 'Mobile Stands']
      },
      {
        title: 'Audio & Wearables',
        items: ['Bluetooth Earphones & TWS', 'Headphones', 'Bluetooth Speakers', 'Smartwatches']
      },
      {
        title: 'Computer & Peripherals',
        items: ['Keyboards & Mice', 'USB Flash Drives', 'Mousepads', 'Laptop Stands']
      },
      {
        title: 'Smart Home & Care',
        items: ['Trimmers & Shavers', 'Hair Dryers & Straighteners', 'Extension Cords', 'Smart Plugs']
      }
    ]
  },
  {
    id: 'watches',
    name: 'Watches',
    columns: [
      {
        title: 'Men Watches',
        items: ['View All', 'Analog Watches', 'Digital Watches', 'Chronograph Watches', 'Leather Strap Watches', 'Metal Strap Watches']
      },
      {
        title: 'Women Watches',
        items: ['View All', 'Analog Watches', 'Designer Watches', 'Rose Gold Watches', 'Strap & Bracelet Watches']
      },
      {
        title: 'Smart Watches',
        items: ['Fitness Bands', 'Calling Smartwatches', 'Sports Watches', 'Kids Smartwatches']
      }
    ]
  },
  {
    id: 'sports-fitness',
    name: 'Sports & Fitness',
    columns: [
      {
        title: 'Fitness & Gym',
        items: ['Dumbbells & Weights', 'Resistance Bands', 'Yoga Mats', 'Skipping Ropes', 'Gym Gloves']
      },
      {
        title: 'Sports Gear',
        items: ['Cricket Gear', 'Badminton Racquets & Shuttles', 'Football', 'Swimming Essentials', 'Skating']
      },
      {
        title: 'Sportswear',
        items: ['Gym T-Shirts', 'Track Pants & Tights', 'Sports Bras', 'Sweatbands & Sippers']
      }
    ]
  },
  {
    id: 'car-motorbike',
    name: 'Car & Motorbike',
    columns: [
      {
        title: 'Bike Accessories',
        items: ['Helmets', 'Bike Covers', 'Riding Gloves', 'Riding Jackets', 'Mobile Holders']
      },
      {
        title: 'Car Accessories',
        items: ['Car Perfumes', 'Car Seat Covers', 'Cleaning Cloths & Dusters', 'Car Mobile Chargers', 'Sunshades']
      }
    ]
  },
  {
    id: 'office-supplies',
    name: 'Office Supplies',
    columns: [
      {
        title: 'Stationery',
        items: ['Notebooks & Diaries', 'Pens & Pencils', 'Files & Folders', 'Desk Organizers']
      },
      {
        title: 'Art & Craft',
        items: ['Paints & Canvases', 'Markers & Highlighters', 'Glue & Adhesives', 'Scissors & Cutters']
      },
      {
        title: 'Calculators & Electronics',
        items: ['Scientific & Basic Calculators', 'Laminators', 'Label Makers']
      }
    ]
  }
]
