# FomoFactory Backend
This is a backend service to collect and store real-time price data for cryptocurrencies. The service is built with Node.js, Express, and MongoDB.

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance running (local or cloud)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/realtime-price-data-backend.git
    cd realtime-price-data-backend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

### Configuration

Create a `.env` file in the root of the project and add the following environment variables:

```plaintext
MONGO_URI=mongodb://localhost:27017/yourdbname
PORT=5000
COINGECKO_API_KEY=your_coingecko_api_key


3. npm start


# FomoFactory Frontend


## Getting Started

1.Install the dependencies:
    ```bash
    npm install
    ```


2.```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
