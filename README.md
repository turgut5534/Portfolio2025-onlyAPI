
This project focuses purely on **routing, rendering, and API consumption**.

---

## 🧩 Tech Stack

| Layer | Technology |
|-----|-----------|
| Server | Express.js (Node.js) |
| Language | JavaScript (ES6+) |
| Views | EJS / Pug / Handlebars |
| Styling | CSS / Tailwind / Bootstrap |
| API Client | Axios / Fetch |
| Auth | External API (JWT / Cookies) |

---

## 📁 Project Structure

```
src/
├── routes/
│   ├── adminRouter.js       # Admin panel pages
├── public/                # Static assets
├── app.js
└── views/                     #Template files
```

## ⚙️ Environment Variables

Create a .env file in the root directory:

```
PORT=3000
API_URL=https://api.portfolio.turgutsalgin.com
DOMAIN_NAME= (your website domain)
```

## ▶️ Installation & Running

Development

```
npm install
npm run dev
```

## 🛠 Admin Panel

* Server-rendered admin interface

* Uses external APIs for:

* Login / logout

* CRUD operations

* No direct data handling

👉 Backend API Project: (https://github.com/turgut5534/portfolio-admin-api-nestjs-prisma)



## 🌍 Portfolio Website

* Public-facing portfolio pages

* SEO-friendly server-rendered HTML

* Data fetched at request time

👉 Live Website: (https://turgutsalgin.com)


## Author
Turgut Salgın

Portfolio: (https://turgutsalgin.com)
LinkedIn: (https://www.linkedin.com/in/turgut-salgin/)
