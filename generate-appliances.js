const fs = require('fs');
const path = require('path');

const appliances = [
  {
    file: 'fridge-samsung.svg',
    title: 'Samsung Bespoke 4-Door',
    sub: 'Smart Inverter Refrigerator',
    accent: '#38bdf8',
    icon: `
      <rect x='130' y='55' width='140' height='260' rx='14' fill='#1e293b' stroke='#38bdf8' stroke-width='4'/>
      <line x1='130' y1='170' x2='270' y2='170' stroke='#334155' stroke-width='3'/>
      <line x1='200' y1='55' x2='200' y2='170' stroke='#334155' stroke-width='3'/>
      <rect x='145' y='85' width='14' height='40' rx='3' fill='#38bdf8'/>
      <rect x='241' y='85' width='14' height='40' rx='3' fill='#38bdf8'/>
      <rect x='193' y='185' width='14' height='45' rx='3' fill='#94a3b8'/>
      <rect x='145' y='68' width='40' height='12' rx='3' fill='#0284c7' opacity='0.7'/>
    `
  },
  {
    file: 'washer-lg.svg',
    title: 'LG AI Direct Drive',
    sub: 'Front Load Washing Machine',
    accent: '#f43f5e',
    icon: `
      <rect x='120' y='65' width='160' height='240' rx='16' fill='#1e293b' stroke='#f43f5e' stroke-width='4'/>
      <rect x='135' y='80' width='130' height='36' rx='6' fill='#334155'/>
      <circle cx='155' cy='98' r='10' fill='#f43f5e'/>
      <rect x='180' y='90' width='70' height='16' rx='3' fill='#0f172a'/>
      <circle cx='200' cy='205' r='60' fill='#0f172a' stroke='#f43f5e' stroke-width='5'/>
      <circle cx='200' cy='205' r='45' fill='#1e293b' stroke='#38bdf8' stroke-width='3' stroke-dasharray='10 5'/>
      <circle cx='200' cy='205' r='20' fill='#0284c7' opacity='0.5'/>
    `
  },
  {
    file: 'vacuum-dyson.svg',
    title: 'Dyson V15 Detect Absolute',
    sub: 'Cordless Stick Vacuum',
    accent: '#eab308',
    icon: `
      <rect x='185' y='45' width='30' height='60' rx='8' fill='#eab308'/>
      <circle cx='200' cy='75' r='22' fill='#713f12' stroke='#eab308' stroke-width='3'/>
      <rect x='193' y='105' width='14' height='140' fill='#a855f7'/>
      <polygon points='160,280 240,280 220,245 180,245' fill='#3b82f6'/>
      <ellipse cx='200' cy='280' rx='45' ry='12' fill='#1d4ed8'/>
      <rect x='155' y='80' width='25' height='35' rx='6' fill='#64748b'/>
    `
  },
  {
    file: 'dishwasher-bosch.svg',
    title: 'Bosch Series 6',
    sub: 'Built-in Dishwasher',
    accent: '#10b981',
    icon: `
      <rect x='120' y='65' width='160' height='240' rx='10' fill='#1e293b' stroke='#10b981' stroke-width='4'/>
      <rect x='130' y='75' width='140' height='30' fill='#0f172a' rx='4'/>
      <circle cx='150' cy='90' r='5' fill='#10b981'/>
      <circle cx='165' cy='90' r='5' fill='#10b981'/>
      <rect x='220' y='85' width='40' height='10' rx='3' fill='#10b981' opacity='0.8'/>
      <rect x='140' y='125' width='120' height='8' rx='4' fill='#64748b'/>
      <rect x='140' y='155' width='120' height='120' rx='8' fill='#0f172a' stroke='#334155' stroke-width='2'/>
      <circle cx='180' cy='215' r='28' fill='none' stroke='#94a3b8' stroke-width='4'/>
      <circle cx='220' cy='215' r='20' fill='none' stroke='#64748b' stroke-width='3'/>
    `
  },
  {
    file: 'tv-sony.svg',
    title: 'Sony BRAVIA 3 4K',
    sub: 'Ultra HD Smart TV',
    accent: '#6366f1',
    icon: `
      <rect x='70' y='75' width='260' height='160' rx='8' fill='#020617' stroke='#6366f1' stroke-width='4'/>
      <rect x='80' y='85' width='240' height='140' rx='4' fill='#1e1b4b'/>
      <polygon points='160,125 240,155 160,185' fill='#a855f7' opacity='0.7'/>
      <rect x='192' y='235' width='16' height='40' fill='#475569'/>
      <rect x='140' y='275' width='120' height='10' rx='4' fill='#64748b'/>
    `
  },
  {
    file: 'ac-voltas.svg',
    title: 'Voltas Inverter Split AC',
    sub: 'Smart Cooling Air Conditioner',
    accent: '#06b6d4',
    icon: `
      <rect x='80' y='110' width='240' height='90' rx='12' fill='#1e293b' stroke='#06b6d4' stroke-width='4'/>
      <line x1='90' y1='165' x2='310' y2='165' stroke='#06b6d4' stroke-width='3'/>
      <circle cx='285' cy='135' r='8' fill='#22d3ee'/>
      <rect x='110' y='175' width='180' height='12' rx='3' fill='#0f172a'/>
      <path d='M130,215 C140,235 160,245 170,260' stroke='#38bdf8' stroke-width='3' stroke-dasharray='4 4' fill='none'/>
      <path d='M200,215 C200,235 200,245 200,260' stroke='#38bdf8' stroke-width='3' stroke-dasharray='4 4' fill='none'/>
      <path d='M270,215 C260,235 240,245 230,260' stroke='#38bdf8' stroke-width='3' stroke-dasharray='4 4' fill='none'/>
    `
  },
  {
    file: 'espresso-philips.svg',
    title: 'Philips Barista Brew',
    sub: 'Espresso Coffee Machine',
    accent: '#d97706',
    icon: `
      <rect x='125' y='75' width='150' height='210' rx='12' fill='#1e293b' stroke='#d97706' stroke-width='4'/>
      <rect x='145' y='55' width='110' height='24' rx='4' fill='#78350f'/>
      <rect x='145' y='95' width='110' height='40' rx='4' fill='#0f172a'/>
      <circle cx='175' cy='115' r='10' fill='#d97706'/>
      <circle cx='225' cy='115' r='10' fill='#d97706'/>
      <rect x='170' y='145' width='60' height='25' rx='5' fill='#94a3b8'/>
      <rect x='160' y='205' width='80' height='55' rx='6' fill='#fef3c7' stroke='#b45309' stroke-width='3'/>
      <line x1='190' y1='170' x2='190' y2='205' stroke='#78350f' stroke-width='4'/>
      <line x1='210' y1='170' x2='210' y2='205' stroke='#78350f' stroke-width='4'/>
    `
  },
  {
    file: 'fridge-whirlpool.svg',
    title: 'Whirlpool IntelliFresh',
    sub: 'Double Door Refrigerator',
    accent: '#a855f7',
    icon: `
      <rect x='130' y='55' width='140' height='260' rx='12' fill='#1e293b' stroke='#a855f7' stroke-width='4'/>
      <line x1='130' y1='145' x2='270' y2='145' stroke='#334155' stroke-width='4'/>
      <rect x='245' y='85' width='10' height='40' rx='3' fill='#c084fc'/>
      <rect x='245' y='165' width='10' height='70' rx='3' fill='#c084fc'/>
      <circle cx='160' cy='95' r='12' fill='#6b21a8' stroke='#c084fc' stroke-width='2'/>
    `
  },
  {
    file: 'washer-haier.svg',
    title: 'Haier Inverter',
    sub: 'Front Load Washer 8kg',
    accent: '#0284c7',
    icon: `
      <rect x='120' y='65' width='160' height='240' rx='14' fill='#1e293b' stroke='#0284c7' stroke-width='4'/>
      <rect x='135' y='80' width='130' height='30' rx='4' fill='#0f172a'/>
      <rect x='195' y='87' width='55' height='16' rx='3' fill='#0284c7'/>
      <circle cx='155' cy='95' r='7' fill='#38bdf8'/>
      <circle cx='200' cy='205' r='58' fill='#0f172a' stroke='#0284c7' stroke-width='4'/>
      <circle cx='200' cy='205' r='40' fill='#1e293b' stroke='#38bdf8' stroke-width='2'/>
      <path d='M180,205 Q200,180 220,205 Q200,230 180,205' fill='#38bdf8' opacity='0.7'/>
    `
  },
  {
    file: 'tv-samsung.svg',
    title: 'Samsung Neo QLED 4K',
    sub: '55-inch Smart TV',
    accent: '#3b82f6',
    icon: `
      <rect x='65' y='70' width='270' height='165' rx='6' fill='#020617' stroke='#3b82f6' stroke-width='4'/>
      <rect x='75' y='80' width='250' height='145' fill='#0f172a'/>
      <circle cx='200' cy='150' r='45' fill='none' stroke='#38bdf8' stroke-width='4'/>
      <polygon points='190,130 220,150 190,170' fill='#38bdf8'/>
      <rect x='170' y='235' width='60' height='35' fill='#475569' rx='4'/>
      <rect x='130' y='270' width='140' height='8' rx='4' fill='#64748b'/>
    `
  },
  {
    file: 'airfryer-philips.svg',
    title: 'Philips Airfryer XXL',
    sub: 'Multi-Cooker Healthy Fryer',
    accent: '#ea580c',
    icon: `
      <rect x='130' y='70' width='140' height='210' rx='28' fill='#1e293b' stroke='#ea580c' stroke-width='4'/>
      <circle cx='200' cy='115' r='26' fill='#0f172a' stroke='#ea580c' stroke-width='3'/>
      <text x='200' y='121' text-anchor='middle' fill='#fb923c' font-size='16' font-weight='bold'>200°</text>
      <rect x='145' y='160' width='110' height='100' rx='14' fill='#0f172a' stroke='#475569' stroke-width='2'/>
      <rect x='185' y='195' width='30' height='30' rx='6' fill='#ea580c'/>
    `
  },
  {
    file: 'washer-bosch.svg',
    title: 'Bosch Series 4',
    sub: 'EcoSilence Washing Machine',
    accent: '#14b8a6',
    icon: `
      <rect x='120' y='65' width='160' height='240' rx='14' fill='#1e293b' stroke='#14b8a6' stroke-width='4'/>
      <rect x='135' y='80' width='130' height='32' rx='4' fill='#0f172a'/>
      <circle cx='200' cy='96' r='10' fill='#14b8a6'/>
      <rect x='145' y='89' width='35' height='14' rx='2' fill='#2dd4bf'/>
      <circle cx='200' cy='205' r='60' fill='#0f172a' stroke='#14b8a6' stroke-width='4'/>
      <circle cx='200' cy='205' r='42' fill='#1e293b' stroke='#2dd4bf' stroke-width='2'/>
      <circle cx='200' cy='205' r='18' fill='#0d9488'/>
    `
  },
  {
    file: 'ac-lg.svg',
    title: 'LG Dual Inverter AC',
    sub: 'Convertible 6-in-1 Split AC',
    accent: '#e11d48',
    icon: `
      <rect x='80' y='110' width='240' height='90' rx='12' fill='#1e293b' stroke='#e11d48' stroke-width='4'/>
      <rect x='100' y='170' width='200' height='14' rx='3' fill='#0f172a'/>
      <circle cx='280' cy='135' r='8' fill='#fb7185'/>
      <text x='115' y='145' fill='#fda4af' font-size='12' font-weight='bold'>DUAL Inverter</text>
      <path d='M130,210 C140,230 160,240 170,255' stroke='#fb7185' stroke-width='3' stroke-dasharray='4 4' fill='none'/>
      <path d='M200,210 C200,230 200,240 200,255' stroke='#fb7185' stroke-width='3' stroke-dasharray='4 4' fill='none'/>
      <path d='M270,210 C260,230 240,240 230,255' stroke='#fb7185' stroke-width='3' stroke-dasharray='4 4' fill='none'/>
    `
  },
  {
    file: 'purifier-dyson.svg',
    title: 'Dyson Purifier Cool',
    sub: 'Air Purifying Tower Fan',
    accent: '#38bdf8',
    icon: `
      <ellipse cx='200' cy='125' rx='42' ry='75' fill='none' stroke='#38bdf8' stroke-width='8'/>
      <ellipse cx='200' cy='125' rx='30' ry='60' fill='#0f172a'/>
      <rect x='168' y='200' width='64' height='100' rx='12' fill='#1e293b' stroke='#38bdf8' stroke-width='3'/>
      <circle cx='200' cy='225' r='10' fill='#0284c7'/>
      <rect x='180' y='250' width='40' height='35' rx='4' fill='#334155' stroke='#38bdf8' stroke-width='1' stroke-dasharray='3 3'/>
    `
  },
  {
    file: 'water-panasonic.svg',
    title: 'Panasonic UV Purifier',
    sub: '2-in-1 Water Purifier',
    accent: '#06b6d4',
    icon: `
      <rect x='130' y='65' width='140' height='230' rx='16' fill='#1e293b' stroke='#06b6d4' stroke-width='4'/>
      <rect x='145' y='80' width='110' height='80' rx='8' fill='#0891b2' opacity='0.7'/>
      <path d='M190,125 C190,110 200,100 200,100 C200,100 210,110 210,125 C210,135 200,140 200,140 C200,140 190,135 190,125 Z' fill='#e0f2fe'/>
      <rect x='145' y='175' width='110' height='40' rx='6' fill='#0f172a'/>
      <circle cx='200' cy='195' r='10' fill='#22d3ee'/>
      <rect x='188' y='225' width='24' height='45' rx='4' fill='#64748b'/>
    `
  },
  {
    file: 'fridge-samsung-bespoke.svg',
    title: 'Samsung Bespoke 330L',
    sub: 'Bottom Mount Refrigerator',
    accent: '#ec4899',
    icon: `
      <rect x='130' y='55' width='140' height='260' rx='14' fill='#1e293b' stroke='#ec4899' stroke-width='4'/>
      <rect x='136' y='61' width='128' height='140' fill='#831843' rx='8'/>
      <rect x='136' y='207' width='128' height='102' fill='#1e293b' rx='8'/>
      <rect x='245' y='115' width='10' height='40' rx='2' fill='#f472b6'/>
      <rect x='245' y='235' width='10' height='40' rx='2' fill='#f472b6'/>
    `
  },
  {
    file: 'toaster-philips.svg',
    title: 'Philips Pop-up Toaster',
    sub: 'Daily Collection 2-Slice',
    accent: '#f59e0b',
    icon: `
      <rect x='110' y='125' width='180' height='130' rx='24' fill='#1e293b' stroke='#f59e0b' stroke-width='4'/>
      <rect x='135' y='105' width='55' height='25' rx='6' fill='#d97706'/>
      <rect x='210' y='105' width='55' height='25' rx='6' fill='#d97706'/>
      <rect x='145' y='95' width='35' height='15' rx='3' fill='#fbbf24'/>
      <rect x='220' y='95' width='35' height='15' rx='3' fill='#fbbf24'/>
      <circle cx='160' cy='195' r='14' fill='#0f172a' stroke='#f59e0b' stroke-width='2'/>
      <rect x='265' y='165' width='25' height='12' rx='3' fill='#fbbf24'/>
    `
  },
  {
    file: 'microwave-whirlpool.svg',
    title: 'Whirlpool Magicook Pro',
    sub: 'Convection Microwave Oven',
    accent: '#8b5cf6',
    icon: `
      <rect x='90' y='95' width='220' height='160' rx='14' fill='#1e293b' stroke='#8b5cf6' stroke-width='4'/>
      <rect x='105' y='110' width='135' height='130' rx='8' fill='#0f172a' stroke='#475569' stroke-width='2'/>
      <circle cx='172' cy='175' r='40' fill='none' stroke='#a78bfa' stroke-width='2' stroke-dasharray='6 4'/>
      <rect x='250' y='110' width='45' height='130' rx='6' fill='#0f172a'/>
      <rect x='256' y='120' width='33' height='20' rx='3' fill='#a78bfa' opacity='0.7'/>
      <circle cx='272' cy='165' r='10' fill='#8b5cf6'/>
      <circle cx='272' cy='200' r='10' fill='#8b5cf6'/>
    `
  },
  {
    file: 'dishwasher-bosch-s8.svg',
    title: 'Bosch Series 8',
    sub: 'Fully Integrated Dishwasher',
    accent: '#10b981',
    icon: `
      <rect x='120' y='65' width='160' height='240' rx='8' fill='#1e293b' stroke='#10b981' stroke-width='4'/>
      <rect x='128' y='71' width='144' height='30' fill='#064e3b' rx='4'/>
      <circle cx='145' cy='86' r='4' fill='#34d399'/>
      <circle cx='160' cy='86' r='4' fill='#34d399'/>
      <circle cx='175' cy='86' r='4' fill='#34d399'/>
      <rect x='215' y='80' width='45' height='12' rx='2' fill='#34d399' opacity='0.8'/>
      <rect x='140' y='125' width='120' height='140' rx='6' fill='#0f172a' stroke='#334155' stroke-width='2'/>
      <circle cx='200' cy='195' r='38' fill='none' stroke='#6ee7b7' stroke-width='4'/>
      <circle cx='200' cy='195' r='18' fill='none' stroke='#a7f3d0' stroke-width='3'/>
    `
  },
  {
    file: 'blender-preethi.svg',
    title: 'Preethi Power Mixer',
    sub: '750W Mixer Grinder & Blender',
    accent: '#ef4444',
    icon: `
      <polygon points='160,75 240,75 225,175 175,175' fill='#1e293b' stroke='#ef4444' stroke-width='3'/>
      <rect x='150' y='65' width='100' height='14' rx='4' fill='#dc2626'/>
      <rect x='165' y='175' width='70' height='30' fill='#475569'/>
      <rect x='145' y='205' width='110' height='80' rx='16' fill='#1e293b' stroke='#ef4444' stroke-width='4'/>
      <circle cx='200' cy='245' r='16' fill='#ef4444'/>
      <line x1='200' y1='235' x2='200' y2='250' stroke='#fff' stroke-width='3'/>
    `
  },
  {
    file: 'kettle-morphy.svg',
    title: 'Morphy Richards Kettle',
    sub: 'Electric Glass Kettle 1.7L',
    accent: '#38bdf8',
    icon: `
      <rect x='135' y='90' width='130' height='160' rx='22' fill='#0284c7' opacity='0.3' stroke='#38bdf8' stroke-width='4'/>
      <rect x='145' y='70' width='110' height='24' rx='6' fill='#0f172a' stroke='#38bdf8' stroke-width='2'/>
      <path d='M265,115 Q310,160 265,215' fill='none' stroke='#64748b' stroke-width='10' stroke-linecap='round'/>
      <rect x='125' y='250' width='150' height='24' rx='8' fill='#0f172a' stroke='#38bdf8' stroke-width='3'/>
      <line x1='155' y1='135' x2='180' y2='135' stroke='#38bdf8' stroke-width='3'/>
      <line x1='155' y1='165' x2='185' y2='165' stroke='#38bdf8' stroke-width='3'/>
      <line x1='155' y1='195' x2='180' y2='195' stroke='#38bdf8' stroke-width='3'/>
    `
  },
  {
    file: 'ac-voltas-pure.svg',
    title: 'Voltas Pure Air AC',
    sub: 'Inverter AC with Air Filter',
    accent: '#10b981',
    icon: `
      <rect x='80' y='110' width='240' height='90' rx='12' fill='#1e293b' stroke='#10b981' stroke-width='4'/>
      <rect x='100' y='170' width='200' height='14' rx='3' fill='#0f172a'/>
      <circle cx='280' cy='135' r='8' fill='#34d399'/>
      <text x='115' y='145' fill='#6ee7b7' font-size='12' font-weight='bold'>PureAir Filter</text>
      <path d='M130,210 C140,230 160,240 170,255' stroke='#34d399' stroke-width='3' stroke-dasharray='4 4' fill='none'/>
      <path d='M200,210 C200,230 200,240 200,255' stroke='#34d399' stroke-width='3' stroke-dasharray='4 4' fill='none'/>
      <path d='M270,210 C260,230 240,240 230,255' stroke='#34d399' stroke-width='3' stroke-dasharray='4 4' fill='none'/>
    `
  },
  {
    file: 'vacuum-dyson-v8.svg',
    title: 'Dyson V8 Cordless',
    sub: 'Slim Fluffy Cordless Vacuum',
    accent: '#f59e0b',
    icon: `
      <rect x='185' y='55' width='30' height='55' rx='6' fill='#d97706'/>
      <circle cx='200' cy='85' r='20' fill='#78350f' stroke='#f59e0b' stroke-width='3'/>
      <rect x='193' y='110' width='14' height='135' fill='#e11d48'/>
      <polygon points='160,280 240,280 220,245 180,245' fill='#f59e0b'/>
      <ellipse cx='200' cy='280' rx='45' ry='12' fill='#b45309'/>
    `
  },
  {
    file: 'iron-philips.svg',
    title: 'Philips Steam Iron',
    sub: 'EasySpeed 2000W Steam Iron',
    accent: '#06b6d4',
    icon: `
      <path d='M110,235 L280,235 Q310,235 290,195 L210,135 Q190,120 150,130 L120,165 Z' fill='#1e293b' stroke='#06b6d4' stroke-width='4'/>
      <path d='M135,155 Q180,135 230,160 L220,180 Q180,160 140,180 Z' fill='#0891b2'/>
      <rect x='100' y='235' width='200' height='14' rx='3' fill='#64748b'/>
      <circle cx='180' cy='195' r='14' fill='#06b6d4'/>
    `
  },
  {
    file: 'microwave-panasonic.svg',
    title: 'Panasonic Convection',
    sub: 'Microwave Oven 27L',
    accent: '#3b82f6',
    icon: `
      <rect x='90' y='95' width='220' height='160' rx='14' fill='#1e293b' stroke='#3b82f6' stroke-width='4'/>
      <rect x='105' y='110' width='135' height='130' rx='8' fill='#0f172a' stroke='#475569' stroke-width='2'/>
      <rect x='125' y='130' width='95' height='90' rx='4' fill='#1e3a8a' opacity='0.4'/>
      <rect x='250' y='110' width='45' height='130' rx='6' fill='#0f172a'/>
      <rect x='256' y='120' width='33' height='18' rx='2' fill='#60a5fa'/>
      <circle cx='272' cy='160' r='8' fill='#3b82f6'/>
      <circle cx='272' cy='190' r='8' fill='#3b82f6'/>
      <circle cx='272' cy='220' r='8' fill='#3b82f6'/>
    `
  },
  {
    file: 'espresso-delonghi.svg',
    title: 'DeLonghi Magnifica S',
    sub: 'Automatic Bean to Cup Machine',
    accent: '#d97706',
    icon: `
      <rect x='120' y='65' width='160' height='230' rx='14' fill='#1e293b' stroke='#d97706' stroke-width='4'/>
      <rect x='135' y='80' width='130' height='45' rx='6' fill='#0f172a'/>
      <circle cx='165' cy='103' r='10' fill='#d97706'/>
      <circle cx='200' cy='103' r='10' fill='#d97706'/>
      <circle cx='235' cy='103' r='10' fill='#d97706'/>
      <rect x='170' y='150' width='60' height='30' rx='4' fill='#78350f'/>
      <rect x='160' y='210' width='80' height='55' rx='6' fill='#fef3c7' stroke='#b45309' stroke-width='3'/>
    `
  },
  {
    file: 'water-lg.svg',
    title: 'LG PuriCare Tankless',
    sub: 'RO + UV Water Purifier',
    accent: '#ec4899',
    icon: `
      <rect x='130' y='65' width='140' height='230' rx='16' fill='#1e293b' stroke='#ec4899' stroke-width='4'/>
      <rect x='145' y='80' width='110' height='90' rx='8' fill='#831843' opacity='0.7'/>
      <circle cx='200' cy='125' r='20' fill='#f472b6'/>
      <rect x='145' y='185' width='110' height='35' rx='6' fill='#0f172a'/>
      <rect x='190' y='230' width='20' height='45' rx='4' fill='#64748b'/>
    `
  },
  {
    file: 'vacuum-bosch.svg',
    title: 'Bosch Series 6 Vacuum',
    sub: 'Bagless Canister Vacuum',
    accent: '#ef4444',
    icon: `
      <rect x='120' y='135' width='160' height='120' rx='30' fill='#1e293b' stroke='#ef4444' stroke-width='4'/>
      <circle cx='160' cy='235' r='25' fill='#0f172a' stroke='#ef4444' stroke-width='4'/>
      <circle cx='240' cy='235' r='25' fill='#0f172a' stroke='#ef4444' stroke-width='4'/>
      <path d='M170,135 Q150,75 200,75 Q250,75 230,135' fill='none' stroke='#64748b' stroke-width='8'/>
      <rect x='165' y='155' width='70' height='40' rx='6' fill='#b91c1c'/>
    `
  },
  {
    file: 'induction-prestige.svg',
    title: 'Prestige Induction Cooktop',
    sub: 'Smart Induction Cooker 2000W',
    accent: '#f97316',
    icon: `
      <rect x='100' y='115' width='200' height='150' rx='16' fill='#1e293b' stroke='#f97316' stroke-width='4'/>
      <circle cx='180' cy='190' r='48' fill='#0f172a' stroke='#ea580c' stroke-width='4'/>
      <circle cx='180' cy='190' r='25' fill='none' stroke='#f97316' stroke-width='2' stroke-dasharray='6 4'/>
      <rect x='245' y='140' width='45' height='100' rx='6' fill='#0f172a'/>
      <rect x='252' y='150' width='30' height='16' rx='2' fill='#fdba74'/>
      <circle cx='267' cy='185' r='6' fill='#ea580c'/>
      <circle cx='267' cy='210' r='6' fill='#ea580c'/>
    `
  },
  {
    file: 'purifier-philips.svg',
    title: 'Philips 800 Series',
    sub: 'Compact Room Air Purifier',
    accent: '#06b6d4',
    icon: `
      <rect x='130' y='75' width='140' height='210' rx='24' fill='#1e293b' stroke='#06b6d4' stroke-width='4'/>
      <circle cx='200' cy='120' r='24' fill='#0891b2'/>
      <circle cx='200' cy='120' r='14' fill='#0f172a'/>
      <rect x='150' y='165' width='100' height='90' rx='8' fill='#0f172a' stroke='#06b6d4' stroke-width='1' stroke-dasharray='4 3'/>
    `
  }
];

appliances.forEach(app => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 380' width='100%' height='100%'>
    <defs>
      <linearGradient id='bgGrad-${app.file}' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='#0f172a'/>
        <stop offset='100%' stop-color='#1e293b'/>
      </linearGradient>
    </defs>
    <rect width='400' height='380' fill='url(#bgGrad-${app.file})'/>
    <circle cx='200' cy='175' r='125' fill='${app.accent}' opacity='0.08'/>
    
    <!-- Appliance Vector -->
    ${app.icon}
    
    <!-- Info Badge -->
    <rect x='20' y='325' width='360' height='42' rx='8' fill='#020617' opacity='0.9' stroke='#334155' stroke-width='1'/>
    <text x='35' y='345' fill='#f8fafc' font-family='system-ui, sans-serif' font-size='13' font-weight='bold'>${app.title}</text>
    <text x='35' y='360' fill='${app.accent}' font-family='system-ui, sans-serif' font-size='11' font-weight='500'>${app.sub}</text>
  </svg>`;
  
  fs.writeFileSync(path.join('public', 'products', app.file), svg);
});

console.log('Successfully written ' + appliances.length + ' home appliance files to public/products/');
