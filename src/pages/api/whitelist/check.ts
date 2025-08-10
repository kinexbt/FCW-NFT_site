import { NextApiRequest, NextApiResponse } from 'next';
import { getWhitelistCollection } from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { wallet } = req.query;

    if (!wallet || typeof wallet !== 'string') {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    const collection = await getWhitelistCollection();

    const whitelistEntry = await collection.findOne({
      walletAddress: wallet.toLowerCase(),
      isWhitelisted: true
    });

    const isWhitelisted = !!whitelistEntry;

    res.status(200).json({ 
      isWhitelisted,
      walletAddress: wallet.toLowerCase()
    });

  } catch (error) {
    console.error('Error checking whitelist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 