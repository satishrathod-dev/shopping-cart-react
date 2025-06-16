# 🛒 ShopEase - React Shopping Cart

A modern, feature-rich e-commerce shopping cart application built with React, featuring a complete checkout flow, real-time notifications, and persistent cart functionality.

## ✨ Features

### 🛍️ **Core Shopping Experience**
- **Product Catalog** - Browse featured products with ratings and reviews
- **Smart Cart Management** - Add, remove, and update item quantities
- **Real-time Notifications** - Instant feedback when items are added to cart
- **Cart Drawer** - Quick access to cart items with slide-out panel
- **Persistent Cart** - Cart data saved in localStorage across sessions

### 💳 **Complete Checkout Flow**
- **Multi-step Checkout** - Address → Payment → Review flow
- **Address Management** - Add, edit, and manage multiple delivery addresses
- **Payment Methods** - Support for Card, UPI, Net Banking, and COD
- **Order Confirmation** - Professional order success page with tracking info

### 🎯 **Advanced Features**
- **Coupon System** - Apply discount codes with validation
- **Price Calculations** - Real-time totals with discounts and fees
- **Form Validation** - Comprehensive validation for addresses and checkout
- **Responsive Design** - Mobile-first approach, works on all devices
- **Loading States** - Smooth transitions and loading indicators

### 🎨 **User Experience**
- **Toast Notifications** - Beautiful notifications for user actions
- **Smooth Animations** - Polished transitions throughout the app
- **Cart Badge** - Real-time cart count with bounce animation
- **Empty States** - Helpful messaging when cart is empty
- **Error Handling** - User-friendly error messages and validation

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/shopease-cart.git
   cd shopease-cart
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm start
   # or
   yarn start
   \`\`\`

4. **Open your browser**
   Navigate to `http://localhost:${PORT}`

## 🏗️ Project Structure

\`\`\`
src/
├── components/           # Reusable UI components
│   ├── Header.jsx       # Navigation header with cart badge
│   ├── CartNotification.jsx  # Toast notifications
│   ├── CartDrawer.jsx   # Slide-out cart panel
│   └── AddressForm.jsx  # Address management form
├── context/             # React Context for state management
│   ├── CartContext.jsx  # Cart state and operations
│   └── UserContext.jsx  # User and address management
├── pages/               # Main application pages
│   ├── ProductList.jsx  # Product catalog page
│   ├── Cart.jsx         # Shopping cart page
│   ├── Checkout.jsx     # Multi-step checkout
│   └── OrderSuccess.jsx # Order confirmation
├── App.jsx              # Main application component
├── App.css              # Global styles and utilities
└── index.jsx            # Application entry point
\`\`\`

## 🛠️ Built With

- **[React](https://reactjs.org/)** - Frontend framework
- **[React Router](https://reactrouter.com/)** - Client-side routing
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[React Context](https://reactjs.org/docs/context.html)** - State management

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 **Mobile** (320px and up)
- 📱 **Tablet** (768px and up)
- 💻 **Desktop** (1024px and up)
- 🖥️ **Large screens** (1280px and up)

## 🔧 Key Components

### CartContext
Manages global cart state with localStorage persistence:
\`\`\`javascript
// Add item to cart
addToCart(product)

// Update item quantity
updateQuantity(productId, quantity)

// Apply coupon code
applyCoupon(coupon)

// Get cart totals
getCartTotal()
\`\`\`

### Available Coupons
- `SAVE10` - 10% off orders over $100
- `WELCOME20` - 20% off orders over $200
- `MEGA30` - 30% off orders over $500

### Payment Methods
- Credit/Debit Card
- UPI (Unified Payments Interface)
- Net Banking
- Cash on Delivery (COD)


### Adding New Products
Update the products array in `src/pages/ProductList.jsx`:
\`\`\`javascript
const products = [
  {
    id: 7,
    name: "Your Product Name",
    price: 99,
    originalPrice: 129,
    image: "/path/to/image.jpg",
    rating: 4.5,
    reviews: 42,
    category: "Category",
    description: "Product description"
  }
]
\`\`\`

## 🔄 Data Persistence

The application uses localStorage to persist:
- **Cart Items** - Products, quantities, and selections
- **Applied Coupons** - Active discount codes
- **User Preferences** - Settings and preferences

Data is automatically saved on every cart update and restored on app load.


### 🎯 **Planned Features**
- [ ] User authentication and profiles
- [ ] Product search and filtering
- [ ] Wishlist functionality
- [ ] Order history and tracking
- [ ] Product reviews and ratings
- [ ] Inventory management
- [ ] Email notifications
- [ ] Dark mode support - under dev



**Made with  by satish rathod**

⭐ Star this repo if you found it helpful!
