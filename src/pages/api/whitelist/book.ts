import { NextApiRequest, NextApiResponse } from 'next';
import { getWhitelistCollection } from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, email, walletAddress } = req.body;

    // Validate required fields
    if (!username || !email || !walletAddress) {
      return res.status(400).json({ 
        error: 'Missing required fields: username, email, walletAddress' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const collection = await getWhitelistCollection();

    // Check for existing user with same email or wallet address
    const existingUser = await collection.findOne({
      $or: [
        { email: email.toLowerCase() },
        { walletAddress: walletAddress.toLowerCase() }
      ]
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return res.status(409).json({ error: 'Email already registered' });
      } else {
        return res.status(409).json({ error: 'Wallet address already registered' });
      }
    }

    // Save new whitelist booking
    const newBooking = {
      username,
      email: email.toLowerCase(),
      walletAddress: walletAddress.toLowerCase(),
      createdAt: new Date(),
      isWhitelisted: true // Auto-whitelist when booking
    };

    await collection.insertOne(newBooking);

    res.status(201).json({ 
      success: true, 
      message: 'Successfully booked whitelist spot' 
    });

  } catch (error) {
    console.error('Error booking whitelist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 