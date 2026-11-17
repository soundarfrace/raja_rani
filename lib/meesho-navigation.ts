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
    id: 'all-electronics',
    name: 'All Electronics',
    columns: [
      {
        title: 'Top Categories',
        items: ['View All', 'Televisions & Home Audio', 'Refrigerators', 'Washing Machines', 'Air Conditioners', 'Kitchen Appliances']
      },
      {
        title: 'Trending Electronics',
        items: ['Smart TVs', 'Inverter Split ACs', 'Direct Drive Washers', 'Frost Free Refrigerators', 'Cordless Vacuums']
      },
      {
        title: 'Top Brands',
        items: ['Samsung', 'LG', 'Sony', 'Bosch', 'Philips', 'Dyson', 'Voltas', 'Whirlpool']
      },
      {
        title: 'Budget Buys',
        items: ['Under ₹15,000', 'Under ₹30,000', 'Under ₹50,000', 'Premium Over ₹50,000']
      }
    ]
  },
  {
    id: 'televisions',
    name: 'Televisions',
    columns: [
      {
        title: 'By Screen Size',
        items: ['View All', '32 Inch Smart TVs', '43 Inch 4K UHD', '50 & 55 Inch TVs', '65 Inch & Above Large Screens']
      },
      {
        title: 'Display Technology',
        items: ['4K Ultra HD', 'OLED TVs', 'QLED & Neo QLED', 'LED Smart TVs', '4K Smart Projectors']
      },
      {
        title: 'TV Audio & Home Cinema',
        items: ['Soundbars', 'Home Theater Systems', 'Bluetooth Speakers', 'Theatre Bar Systems']
      },
      {
        title: 'Top TV Brands',
        items: ['Sony BRAVIA', 'Samsung Neo QLED', 'LG OLED', 'Panasonic', 'Mi Smart TVs']
      }
    ]
  },
  {
    id: 'refrigerators',
    name: 'Refrigerators',
    columns: [
      {
        title: 'By Door Type',
        items: ['View All', 'Single Door Direct Cool', 'Double Door Frost Free', 'Side by Side Refrigerators', 'Multi-Door & French Door']
      },
      {
        title: 'Capacity & Features',
        items: ['Under 200 Litres', '200 to 350 Litres', '350 Litres & Above', 'Bespoke AI Inverter', 'Convertible Modes']
      },
      {
        title: 'Energy Star Rating',
        items: ['5 Star Energy Saver', '4 Star Inverter', '3 Star Inverter']
      },
      {
        title: 'Top Brands',
        items: ['Samsung Bespoke', 'LG Smart Inverter', 'Whirlpool IntelliFresh', 'Haier Frost Free', 'Bosch']
      }
    ]
  },
  {
    id: 'laundry',
    name: 'Washing Machines',
    columns: [
      {
        title: 'By Type',
        items: ['View All', 'Front Load Fully Automatic', 'Top Load Fully Automatic', 'Semi Automatic Washers', 'Washer Dryer Combos']
      },
      {
        title: 'Capacity',
        items: ['6.5 kg to 7 kg', '7.5 kg to 8.5 kg', '9 kg and Above', 'Commercial Laundry']
      },
      {
        title: 'Smart Features',
        items: ['AI Direct Drive', 'EcoBubble Steam Wash', 'Inverter Motor', 'Heater Built-in']
      },
      {
        title: 'Top Brands',
        items: ['LG AI Direct Drive', 'Samsung EcoBubble', 'Bosch Series 4 & 6', 'Haier', 'Whirlpool']
      }
    ]
  },
  {
    id: 'cooling',
    name: 'Air Conditioners',
    columns: [
      {
        title: 'By Tonnage',
        items: ['View All', '1 Ton AC (Small Rooms)', '1.5 Ton AC (Medium Rooms)', '2 Ton AC (Large Rooms)']
      },
      {
        title: 'AC Types',
        items: ['Inverter Split ACs', 'Window ACs', 'Convertible 6-in-1 ACs', 'Hot and Cold ACs', 'Smart WiFi ACs']
      },
      {
        title: 'Energy Efficiency',
        items: ['5 Star Inverter ACs', '4 Star Inverter ACs', '3 Star Inverter ACs', 'Copper Condenser Coil']
      },
      {
        title: 'Top AC Brands',
        items: ['Voltas Adjustable', 'LG Dual Inverter', 'Daikin', 'Blue Star', 'Panasonic Smart AC']
      }
    ]
  },
  {
    id: 'kitchen-appliances',
    name: 'Kitchen Appliances',
    columns: [
      {
        title: 'Cooking & Heating',
        items: ['View All', 'Convection Microwaves', 'Solo & Grill Microwaves', 'Air Fryers & OTGs', 'All-in-One Multicookers', 'Induction Cooktops']
      },
      {
        title: 'Food Preparation',
        items: ['Mixer Grinders (750W / 1000W)', 'Food Processors', 'Hand Blenders & Choppers', 'Juicers']
      },
      {
        title: 'Coffee & Breakfast',
        items: ['Espresso Machines', 'Coffee Makers', 'Pop-up Toasters', 'Electric Kettles', 'Sandwich Makers']
      },
      {
        title: 'Top Brands',
        items: ['Philips', 'Bosch', 'Whirlpool', 'Panasonic', 'Morphy Richards']
      }
    ]
  },
  {
    id: 'dishwashers',
    name: 'Dishwashers',
    columns: [
      {
        title: 'Dishwasher Type',
        items: ['View All', 'Built-in Dishwashers', 'Freestanding Dishwashers', 'Table Top Dishwashers']
      },
      {
        title: 'Place Settings',
        items: ['12 Place Settings', '13 & 14 Place Settings', '15+ Place Settings (Large Family)']
      },
      {
        title: 'Key Features',
        items: ['Intensive Kadhai 70°', 'Quiet Inverter Drive', 'Hygiene Dry', 'VarioSpeed Plus']
      },
      {
        title: 'Top Brands',
        items: ['Bosch Series 4', 'Bosch Series 6', 'Bosch Series 8', 'LG TrueSteam', 'Siemens']
      }
    ]
  },
  {
    id: 'floor-care',
    name: 'Vacuum & Floor Care',
    columns: [
      {
        title: 'Vacuum Cleaners',
        items: ['View All', 'Cordless Stick Vacuums', 'Robot Vacuum Cleaners', 'Canister / Bagless Cleaners', 'Handheld Vacuums']
      },
      {
        title: 'Features & Technology',
        items: ['Laser Dust Detection', 'HEPA Filtration', 'Wet & Dry Cleaning', 'Pet Hair Specialists']
      },
      {
        title: 'Top Brands',
        items: ['Dyson V15 Detect', 'Dyson V8 Slim', 'Bosch Series 6', 'Eureka Forbes', 'Ecovacs Deebot']
      }
    ]
  },
  {
    id: 'small-appliances',
    name: 'Air Purifiers & Care',
    columns: [
      {
        title: 'Air Quality & Purifiers',
        items: ['View All', 'HEPA Air Purifiers', 'Hot + Cool Purifiers', 'Car Air Purifiers', 'Replacement Filters']
      },
      {
        title: 'Home Care Electronics',
        items: ['Garment Steamers', 'Electric Steam Irons', 'Dehumidifiers', 'Smart Insect Traps']
      },
      {
        title: 'Top Brands',
        items: ['Dyson Purifier Cool', 'Philips 800 Series', 'Coway AirMega', 'Havells']
      }
    ]
  },
  {
    id: 'water-purifiers',
    name: 'Water Purifiers',
    columns: [
      {
        title: 'Purification Technology',
        items: ['View All', 'RO + UV + UF Water Purifiers', 'Alkaline Mineral Purifiers', 'Copper Charge Purifiers', 'Tankless Instant Purifiers']
      },
      {
        title: 'Mounting & Capacity',
        items: ['Wall Mounted Purifiers', 'Under the Sink Purifiers', 'Table Top Models', 'Large Storage (8L - 10L)']
      },
      {
        title: 'Top Brands',
        items: ['LG PuriCare Tankless', 'Panasonic 2-in-1', 'Kent Grand', 'Aquaguard / Eureka Forbes', 'AO Smith']
      }
    ]
  },
  {
    id: 'audio-accessories',
    name: 'Audio & Gadgets',
    columns: [
      {
        title: 'Audio',
        items: ['View All', 'Bluetooth Earphones & TWS', 'Over-Ear Headphones', 'Party Speakers', 'Soundbars']
      },
      {
        title: 'Accessories & Smart Home',
        items: ['Smart Plugs', 'Voltage Stabilizers', 'Power Strips & Surge Protectors', 'HDMI 2.1 Cables', 'TV Wall Mounts']
      },
      {
        title: 'Top Brands',
        items: ['Sony', 'JBL', 'Bose', 'Philips', 'V-Guard']
      }
    ]
  }
]
