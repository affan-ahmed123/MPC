# Madina Pakwan Center (MPC)

Official web application and online WhatsApp ordering system for **Madina Pakwan Center**, located near 10 Number Market, Orangi Town, Karachi, Pakistan.

> **"Delicious Taste with Quality, Always with You"**  
> **Delicious Food • Premium Taste • Your Choice**

---

## Key Features

- **Authentic Royal Pakwan UI:** Responsive, mobile-first dark-gold theme built with React, Tailwind CSS, and Framer Motion.
- **Complete Digital Menu with Portion Selection:**
  - **Biryani & Pulao:**
    - **Special Chicken Biryani:** Quarter Portion 250g (`Rs. 170`) to 1 Kg 4 Pieces (`Rs. 680`)
    - **Special Beef Yakhni Pulao:** Quarter Portion 250g (`Rs. 200`), Half Kg (`Rs. 400`), 3 Quarter (`Rs. 600`), 1 Kg (`Rs. 800`)
    - **Nali Biryani:** Quarter Portion 250g (`Rs. 200`), Half Kg (`Rs. 400`), 3 Quarter (`Rs. 600`), 1 Kg (`Rs. 800`)
    - **Sada Biryani:** Quarter Portion (`Rs. 100`), Half Kg (`Rs. 200`), 1 Kg (`Rs. 400`)
    - **Sada Pulao:** Quarter Portion (`Rs. 100`), Half Kg (`Rs. 200`), 1 Kg (`Rs. 400`)
    - **Mini Chicken Biryani Daig (1 Kg):** `Rs. 2500`
    - **Mini Beef Biryani Daig (1 Kg):** `Rs. 3500`
  - **Fresh Salad, Raita & Water:**
    - **Raita:** `Rs. 60`
    - **Salad:** `Rs. 40`
    - **Water Bottle:** 500ml (`Rs. 60`) | 1.5L (`Rs. 120`)
  - **Chilled Drinks & Juices:**
    - **Pepsi, 7Up, Sprite, Mountain Dew, Cola Next, Fizz Up:** 300ml (`Rs. 90`), 500ml (`Rs. 120`), 1.5L (`Rs. 220`), 2.5L (`Rs. 280`)
    - **Sting:** 300ml (`Rs. 100`), 500ml (`Rs. 140`)
    - **Slice Juice:** `Rs. 70`
    - **Pakola Juice:** `Rs. 110`
- **Delivery Tiers & Direct WhatsApp Checkout:**
  - Distance-based delivery fee selection (**Nearby Area:** `Rs. 70`, **Medium Distance:** `Rs. 150`, **Long Distance:** `Rs. 250`) with **Free Delivery** on orders `Rs. 3000+`.
  - Average delivery time: `15 - 30 Mins` | Operating hours: `Daily: 11:00 AM - 12:00 AM`.
  - Clean slide-out cart drawer and checkout modal that formats a structured order summary with reference ID and opens directly in WhatsApp (`+92 314 1281986`).
- **Customer Reviews & Feedback:**
  - View customer testimonials and submit live reviews backed by the `/api/reviews` serverless endpoint (MongoDB) with local storage fallback.
- **Shop Settings Modal:**
  - Update store contact/WhatsApp settings directly from the footer configuration button.

---

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v3, Framer Motion, Lucide Icons, Canvas Confetti
- **Backend / API:** Vercel Serverless Functions (`api/reviews.js`) with MongoDB
- **Deployment:** Vercel

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Starts the local dev server at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```
Generates optimized static assets inside the `dist/` folder.

### 4. Preview Production Build
```bash
npm run preview
```

---

## Deployment

Pushes to the `main` branch automatically trigger production builds and deployments on Vercel via `vercel.json`.

**Live URL:** [https://musa-six-neon.vercel.app](https://musa-six-neon.vercel.app)
