# Node Boilerplate [![libyzxy0](https://img.shields.io/badge/by-libyzxy0-brightgreen?style=flat&logo=github&color=%2322d3ee)](https://libyzxy0.com)

A simple boilerplate to get started with Drizzle ORM in Node.js

## 📖 Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)

## ⚙️ Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### 🎯 Prerequisites

- Node.js (>= 18.20.x)
- npm (>= 10.x)
- Neon Database Account and Project https://neon.tech

### 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/libyzxy0/node-boilerplate.git
   cd node-boilerplate
   ```

2. Install the dependencies:

   ```bash
   yarn install
   ```

3. Create a `.env` file in the root directory and add your Neon Database Connection String:

   ```plaintext
   NEON_DATABASE_URL=your-neon-database-url
   JWT_SECRET_KEY=yoursupersecret
   ```



### 🚀 Running the Application

To start the application, run:

```bash
yarn run dev
```

## 🗂️ Project Structure

```bash 
NODE-BOILERPLATE/
│
├── src/
│ ├── controllers/
│ ├── db/
│ ├── errors/
│ ├── middlewares/
│ ├── routes/
│ ├── utils/
│ ├── bootstrap.ts
│ ├── index.ts
│
├── tests/
│ ├── unit/
│ └── version.test.ts
│
├── .env
├── .gitignore
├── drizzle.config.ts
├── env.template
├── eslint.config.mjs
├── package.json
├── README.md
├── tsconfig.json
└── yarn.lock
```

## 👨‍💻 Author
* Made with ☕ and 💙 by libyzxy0.
