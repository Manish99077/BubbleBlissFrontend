export const CAFE_INFO = {
  name: 'Bubble Bliss Café',
  tagline: 'Sip The Bliss',
  phone: '+91 93404 53142',
  whatsapp: '919340453142',
  email: 'Bubblebliss108@gmail.com',
  address: 'The Hub, Scheme 78, Part II, Vijay Nagar',
  city: 'Indore, Madhya Pradesh — 452010',
  fullAddress: 'The Hub, Scheme Number 78, Part II, Vijay Nagar, Indore, MP 452010',
  hours: 'Mon–Sun · 10:00 AM – 11:00 PM',
  instagram: '#',
  facebook: '#',
  mapUrl: 'https://maps.google.com/?q=The+Hub+Scheme+78+Vijay+Nagar+Indore+452010',
}

// ─────────────────────────────────────────────────────────────────────────────
// EVERY image URL below is HARDCODED to exactly match its drink/food item.
// DO NOT replace with dynamic/random Unsplash API fetching.
// ─────────────────────────────────────────────────────────────────────────────

export const menuItems = [

  // ══════════ BUBBLE TEA (11) ══════════
  { id:1,  category:'Bubble Tea', name:'Classic Milk Tea',         price:99,  sizePrices:{Medium:99,Large:149},   description:'Silky black tea brewed with creamy fresh milk and chewy tapioca pearls.',                              image:'', tag:'Bestseller', veg:true },
  { id:2,  category:'Bubble Tea', name:'Brown Sugar Milk Tea',     price:129, sizePrices:{Medium:129,Large:179},  description:'Caramelised brown sugar swirled through fresh milk with premium tapioca pearls.',                  image:'', tag:'Popular',    veg:true },
  { id:3,  category:'Bubble Tea', name:'Thai Milk Tea',            price:119, sizePrices:{Medium:119,Large:169},  description:'Aromatic Thai tea blend with condensed milk — a vibrant orange dream in every sip.',               image:'', tag:null,         veg:true },
  { id:4,  category:'Bubble Tea', name:'Taro Bubble Tea',          price:139, sizePrices:{Medium:139,Large:189},  description:'Creamy purple taro blended into silky milk tea with chewy tapioca boba.',                        image:'', tag:'New',         veg:true },
  { id:5,  category:'Bubble Tea', name:'Matcha Bubble Tea',        price:149, sizePrices:{Medium:149,Large:199},  description:'Ceremonial-grade matcha whisked into creamy oat milk with green tapioca pearls.',                 image:'', tag:null,         veg:true },
  { id:6,  category:'Bubble Tea', name:'Mango Bubble Tea',         price:129, sizePrices:{Medium:129,Large:179},  description:'Alphonso mango pulp swirled into creamy milk tea with fruity popping boba.',                    image:'', tag:'Seasonal',    veg:true },
  { id:7,  category:'Bubble Tea', name:'Strawberry Bubble Tea',    price:119, sizePrices:{Medium:119,Large:169},  description:'Fresh strawberry purée blended with milk tea and strawberry popping boba.',                    image:'', tag:null,         veg:true },
  { id:8,  category:'Bubble Tea', name:'Lychee Bubble Tea',        price:129, sizePrices:{Medium:129,Large:179},  description:'Exotic lychee fruit blended with jasmine green tea and lychee jelly pearls.',                  image:'', tag:'Exotic',     veg:true },
  { id:9,  category:'Bubble Tea', name:'Passion Fruit Bubble Tea', price:139, sizePrices:{Medium:139,Large:189},  description:'Tangy passion fruit with jasmine tea and passion fruit jelly — tropical bliss.',               image:'', tag:null,         veg:true },
  { id:10, category:'Bubble Tea', name:'Oreo Bubble Tea',          price:139, sizePrices:{Medium:139,Large:189},  description:'Crushed Oreo cookies blended with milk tea, topped with Oreo crumble.',                       image:'', tag:'Special',    veg:true },
  { id:11, category:'Bubble Tea', name:'KitKat Bubble Tea',        price:149, sizePrices:{Medium:149,Large:199},  description:'KitKat chocolate blended into creamy milk tea with chocolate pearls on top.',                 image:'', tag:'Special',    veg:true },

  // ══════════ MOJITOS (12) ══════════
  { id:12, category:'Mojitos', name:'Mint Mojito',          price:79,  sizePrices:{'Regular (250ml)':79,'Large (350ml)':129},   description:'Classic fresh mint muddled with lime, sugar syrup and sparkling soda over crushed ice.', image:'',   tag:'Classic',      veg:true },
  { id:13, category:'Mojitos', name:'Green Apple Mojito',   price:89,  sizePrices:{'Regular (250ml)':89,'Large (350ml)':139},   description:'Crisp green apple with fresh mint, lime and sparkling water — refreshingly tart.',       image:'', tag:null,           veg:true },
  { id:14, category:'Mojitos', name:'Strawberry Mojito',    price:99,  sizePrices:{'Regular (250ml)':99,'Large (350ml)':149},   description:'Fresh muddled strawberries with mint, lime juice and a sparkling finish.',               image:'',   tag:'Popular',      veg:true },
  { id:15, category:'Mojitos', name:'Blue Lagoon Mojito',   price:99,  sizePrices:{'Regular (250ml)':99,'Large (350ml)':149},   description:'Electric blue curacao with lime, mint and sparkling soda — visually stunning.',           image:'',   tag:'Popular',      veg:true },
  { id:16, category:'Mojitos', name:'Watermelon Mojito',    price:99,  sizePrices:{'Regular (250ml)':99,'Large (350ml)':149},   description:'Juicy watermelon blended with fresh mint, lime zest and bubbly soda.',                    image:'',   tag:null,           veg:true },
  { id:17, category:'Mojitos', name:'Kiwi Mojito',          price:99,  sizePrices:{'Regular (250ml)':99,'Large (350ml)':149},   description:'Fresh kiwi muddled with mint and lime — tangy, vibrant and tropical.',                    image:'', tag:null,           veg:true },
  { id:18, category:'Mojitos', name:'Mango Mojito',         price:99,  sizePrices:{'Regular (250ml)':99,'Large (350ml)':149},   description:'Alphonso mango pulp with mint, lime and sparkling soda — summer in a glass.',             image:'', tag:null,           veg:true },
  { id:19, category:'Mojitos', name:'Passion Fruit Mojito', price:109, sizePrices:{'Regular (250ml)':109,'Large (350ml)':159},  description:'Exotic passion fruit with lime zest, fresh mint and sparkling water.',                    image:'', tag:'Exotic',       veg:true },
  { id:20, category:'Mojitos', name:'Peach Mojito',         price:99,  sizePrices:{'Regular (250ml)':99,'Large (350ml)':149},   description:'Sweet peach with mint, honey, lime and sparkling water — delicate and refreshing.',       image:'', tag:null,           veg:true },
  { id:21, category:'Mojitos', name:'Pineapple Mojito',     price:99,  sizePrices:{'Regular (250ml)':99,'Large (350ml)':149},   description:'Fresh pineapple juice with mint, lime and bubbly soda — a tropical paradise.',            image:'', tag:null,           veg:true },
  { id:22, category:'Mojitos', name:'Masala Mojito',        price:89,  sizePrices:{'Regular (250ml)':89,'Large (350ml)':139},   description:'Indian spiced mojito with jeera, black salt, mint and lime — desi fusion twist.',         image:'', tag:'Desi Special', veg:true },
  { id:23, category:'Mojitos', name:'Bubble Gum Mojito',    price:109, sizePrices:{'Regular (250ml)':109,'Large (350ml)':159},  description:'Fun pink bubble gum flavour with mint and soda — everyone loves it!',                     image:'', tag:'Fun Pick',     veg:true },

  // ══════════ COFFEE (6) ══════════
  { id:24, category:'Coffee', name:'Espresso Shot',       price:79,  description:'Double-pulled premium espresso — rich, bold and unapologetic.',                         image:'', tag:null,        veg:true },
  { id:25, category:'Coffee', name:'Cold Brew',           price:149, description:'18-hour slow cold steeped coffee — ultra-smooth, bold, zero bitterness.',               image:'', tag:'Signature', veg:true },
  { id:26, category:'Coffee', name:'Caramel Latte',       price:169, description:'Velvety espresso with steamed milk and golden salted caramel drizzle.',                  image:'', tag:'Popular',   veg:true },
  { id:27, category:'Coffee', name:'Dalgona Coffee',      price:159, description:'Whipped coffee cloud over chilled milk — the viral café classic done right.',            image:'', tag:'Trending',  veg:true },
  { id:28, category:'Coffee', name:'Hazelnut Cappuccino', price:179, description:'Smooth espresso with steamed milk foam and rich hazelnut syrup.',                        image:'', tag:null,        veg:true },
  { id:29, category:'Coffee', name:'Mocha Frappe',        price:189, description:'Blended espresso with chocolate, milk and whipped cream — dessert in a cup.',            image:'', tag:'Must Try',  veg:true },

  // ══════════ SNACKS — BROWNIES (4) ══════════
  { id:30, category:'Snacks', name:'Walnut Brownie',                 price:80,  description:'Dense, fudgy chocolate brownie loaded with premium California walnuts.',                                   image:'', tag:null,         veg:true },
  { id:31, category:'Snacks', name:'Sizzling Brownie with Ice Cream',price:99,  description:'Hot fudgy brownie on a sizzling iron plate with vanilla ice cream and chocolate sauce.',                   image:'',   tag:'Bestseller', veg:true },
  { id:32, category:'Snacks', name:'Nutella Brownie',                price:99,  description:'Gooey chocolate brownie with a molten Nutella centre — pure indulgence.',                                  image:'', tag:null,         veg:true },
  { id:33, category:'Snacks', name:'Dark Chocolate Brownie',         price:119, description:'70% dark Belgian chocolate brownie — intense, rich and sophisticated.',                                     image:'',   tag:'Premium',    veg:true },

  // ══════════ SNACKS — FRIES (6) ══════════
  { id:34, category:'Snacks', name:'Salted Fries',        price:80,  description:'Golden crispy fries with a perfect salt crust — timeless simplicity.',                       image:'', tag:null,          veg:true },
  { id:35, category:'Snacks', name:'Peri Peri Fries',     price:99,  description:'Crispy fries tossed in fiery peri peri spice blend with herb mayo dip.',                      image:'', tag:'🌶 Spicy',    veg:true },
  { id:36, category:'Snacks', name:'Masala Fries',        price:99,  description:'Fries tossed in signature Indian masala blend with tamarind dip.',                            image:'', tag:'Desi Twist',  veg:true },
  { id:37, category:'Snacks', name:'Garlic Butter Fries', price:119, description:'Fries tossed in aromatic garlic butter with fresh herbs and parmesan.',                       image:'', tag:null,          veg:true },
  { id:38, category:'Snacks', name:'Cheese Loaded Fries', price:129, description:'Crispy fries smothered in premium cheddar cheese sauce with jalapeños.',                      image:'', tag:'Popular',     veg:true },
  { id:39, category:'Snacks', name:'Curly Fries',         price:129, description:'Spiral curly fries seasoned with our signature spice blend — fun to eat!',                    image:'', tag:null,          veg:true },

  // ══════════ SNACKS — SANDWICHES (6) ══════════
  { id:40, category:'Snacks', name:'Veg Sandwich',          price:89,  description:'Fresh vegetables with mint chutney and cheese in toasted brown bread.',           image:'', tag:null,        veg:true },
  { id:41, category:'Snacks', name:'Cheese Corn Sandwich',  price:99,  description:'Sweet corn with melted cheddar cheese in crispy toasted bread.',                  image:'', tag:'Popular',   veg:true },
  { id:42, category:'Snacks', name:'Aloo Masala Sandwich',  price:89,  description:'Spiced mashed potato filling with green chutney in toasted bread.',              image:'', tag:null,        veg:true },
  { id:43, category:'Snacks', name:'Paneer Tikka Sandwich', price:119, description:'Grilled paneer tikka with mint chutney and veggies in toasted bread.',           image:'', tag:null,        veg:true },
  { id:44, category:'Snacks', name:'Club Sandwich',         price:150, description:'Triple-decker sandwich with paneer, veggies, cheese and secret sauce.',          image:'', tag:'Must Try',  veg:true },
  { id:45, category:'Snacks', name:'Mexican Style Wrap',    price:129, description:'Spiced filling with salsa, cheese and jalapeños in a flour tortilla.',           image:'', tag:null,        veg:true },
]

export const categories = ['All', 'Bubble Tea', 'Mojitos', 'Coffee', 'Snacks']