# CCart - Modern E-commerce Platform 🛒

![CCart Banner](https://img.shields.io/badge/CCart-E--commerce-orange?style=for-the-badge)
[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://ccartshoping.netlify.app/)
[![Netlify Status](https://img.shields.io/badge/Netlify-Deployed-success?style=for-the-badge&logo=netlify)](https://ccartshoping.netlify.app/)

## 📱 Overview

CCart is a fully-responsive e-commerce platform built with modern web technologies, designed specifically for the Indian market. This project showcases a comprehensive shopping experience with intuitive navigation, product management, and user authentication.

![Technologies Used](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Technologies Used](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Technologies Used](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Technologies Used](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🛍️ Customer Features
- **Responsive Product Catalog** with filtering and sorting options
- **Detailed Product Pages** with multiple images and specifications
- **Shopping Cart System** with add/remove functionality
- **User Authentication** (login/register) with profile management
- **Category Navigation** for organized product browsing
- **Search Functionality** with autocomplete suggestions
- **Indian Market Integration** with ₹ prices, GST, and local payment methods

### ⚙️ Admin Features
- **Admin Dashboard** for sales monitoring
- **Product Management** (add, edit, remove products)
- **Image Upload** functionality
- **Order Processing** management
- **User Management** capabilities

## 🎨 Design Elements

- **Modern Color Scheme** with primary blue (#3B82F6), accent orange (#F97316)
- **Professional Typography** with optimal readability
- **Subtle Animations** for enhanced user experience
- **Responsive Design** optimized for all devices
- **Card-based Product Display** with consistent visual hierarchy
- **Clean Navigation** with breadcrumbs and filters

## 🚀 Technical Implementation

```
src/
├── components/
│   ├── Layout.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── SearchBar.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   └── ...
├── pages/
│   ├── HomePage.tsx
│   ├── ProductDetailPage.tsx
│   ├── CategoryPage.tsx
│   ├── CartPage.tsx
│   ├── LoginPage.tsx
│   └── admin/
│       ├── AdminDashboard.tsx
│       └── AdminProducts.tsx
├── contexts/
│   ├── AuthContext.tsx
│   ├── CartContext.tsx
│   └── ProductContext.tsx
└── ...
```

## 🔧 Tech Stack

- **Frontend**: React.js with TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Node.js
- **Routing**: React Router
- **State Management**: Context API
- **Data Storage**: Local Storage (Production would use MongoDB)

## 📋 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/rickrahul/CCart-Ecommerce.git

# Navigate to project directory
cd CCart-Ecommerce

# Install dependencies
npm install

# Start development server
npm run dev
```

### Demo Credentials

- **Admin**: admin@example.com / password
- **User**: user@example.com / password

## 🌐 Deployment

The application is deployed on Netlify and can be accessed at [https://ccartshoping.netlify.app/](https://ccartshoping.netlify.app/)

## 🔜 Future Enhancements

- Integration with actual payment gateways (Razorpay, PhonePe)
- PWA support for mobile installation
- Real-time order tracking
- Customer review system
- Wishlist functionality
- Enhanced analytics for admin
---

Developed with ❤️ by Rahul Mondal
