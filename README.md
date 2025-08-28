# FatCat NFT 🐱

A Solana-based NFT minting website for the FatCat collection. Built with modern web technologies for seamless NFT minting experience.

## Features

- 🎨 **NFT Minting** - Mint unique FatCat NFTs on Solana
- 💰 **SOL Payments** - Secure payments via Solana wallet
- 🔗 **Wallet Integration** - Phantom, Solflare, and other Solana wallets
- 📱 **Responsive Design** - Works on desktop and mobile
- ⚡ **Fast Transactions** - Leverages Solana's high-speed blockchain

## Tech Stack

- **Frontend**: React.js / Next.js
- **Blockchain**: Solana
- **Wallet**: @solana/wallet-adapter
- **Styling**: Tailwind CSS
- **Smart Contract**: Metaplex Candy Machine

## Installation

```bash
git clone https://github.com/yourusername/fatcat-nft.git
cd fatcat-nft
npm install
```

## Configuration

Create `.env.local`:

```env
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_SOLANA_RPC_HOST=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_CANDY_MACHINE_ID=your_candy_machine_id
NEXT_PUBLIC_TREASURY_ADDRESS=your_treasury_address
NEXT_PUBLIC_MINT_PRICE_SOL=1.5
NEXT_PUBLIC_COLLECTION_SIZE=10000
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Minting Process

1. **Connect Wallet** - Users connect their Solana wallet
2. **Select Quantity** - Choose number of NFTs to mint
3. **Pay SOL** - Transaction processed on Solana blockchain
4. **Receive NFT** - FatCat NFT appears in wallet

## Project Structure

```
├── components/          # React components
├── pages/              # Next.js pages
├── public/             # Static assets
├── styles/             # CSS/Tailwind styles
├── utils/              # Helper functions
└── config/             # Configuration files
```

## Deployment

Deploy to Vercel:

```bash
npm run build
vercel --prod
```

## License

MIT License

---

**🐱 Please visit our 999 FATCATs and enjoy !!!**
