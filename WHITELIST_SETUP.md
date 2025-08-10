# Whitelist Setup Guide

## How to Set Up Whitelist

### 1. Create Environment File
Create a `.env.local` file in your project root with the following content:

```
NEXT_PUBLIC_WHITELIST_ADDRESSES=0x1234567890123456789012345678901234567890,0xabcdefabcdefabcdefabcdefabcdefabcdefabcd,0x9876543210987654321098765432109876543210
```

### 2. Format
- Use comma-separated wallet addresses
- No spaces around commas
- Addresses are case-insensitive (will be converted to lowercase)

### 3. How It Works
- Users must connect their wallet to access the site
- The system checks if the connected wallet address is in the whitelist
- Only whitelisted users can see:
  - Full NFT images (not blurred)
  - Mint and Claim buttons (not blurred)
  - Access to `/mint` and `/claim` pages
- Non-whitelisted users see:
  - Blurred NFT images with placeholder text
  - Blurred Mint/Claim buttons
  - Redirected away from `/mint` and `/claim` pages

### 4. Testing
1. Add some test addresses to your `.env.local`
2. Connect with a whitelisted wallet → should see full content
3. Connect with a non-whitelisted wallet → should see blurred content
4. Try accessing `/mint` or `/claim` directly → should be redirected if not whitelisted

### 5. Security Notes
- The whitelist is stored in environment variables
- Addresses are checked client-side for UI purposes
- For production, consider server-side validation as well 