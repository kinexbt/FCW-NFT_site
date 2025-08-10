import React, { useState } from 'react';

interface BookWhitelistModalProps {
  open: boolean;
  onClose: () => void;
  onBook: (data: { username: string; email: string; walletAddress: string }) => void;
  walletAddress: string;
}

const BookWhitelistModal: React.FC<BookWhitelistModalProps> = ({ open, onClose, onBook, walletAddress }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; email?: string }>({});

  const validateForm = () => {
    const newErrors: { username?: string; email?: string } = {};
    
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      await onBook({ username: username.trim(), email: email.trim(), walletAddress });
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[101] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-gray-900 border-2 border-yellow-400 rounded-xl shadow-2xl p-8 w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 text-2xl font-bold"
          onClick={onClose}
          disabled={loading}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Book Whitelist</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-white font-medium">
            Username
            <input
              type="text"
              className={`mt-1 w-full px-4 py-2 rounded-md bg-white bg-opacity-10 border text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                errors.username ? 'border-red-400' : 'border-yellow-400'
              }`}
              value={username}
              onChange={e => {
                setUsername(e.target.value);
                if (errors.username) {
                  setErrors(prev => ({ ...prev, username: undefined }));
                }
              }}
              disabled={loading}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-400 text-sm mt-1">{errors.username}</p>
            )}
          </label>
          
          <label className="text-white font-medium">
            Email
            <input
              type="email"
              className={`mt-1 w-full px-4 py-2 rounded-md bg-white bg-opacity-10 border text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                errors.email ? 'border-red-400' : 'border-yellow-400'
              }`}
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors(prev => ({ ...prev, email: undefined }));
                }
              }}
              disabled={loading}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </label>
          
          <div className="text-yellow-300 text-sm mb-1 mt-2">
            Input your connected wallet address. You have to connect with this account later.
          </div>
          
          <label className="text-white font-medium">
            Wallet Address
            <input
              type="text"
              className="mt-1 w-full px-4 py-2 rounded-md bg-white bg-opacity-10 border border-yellow-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={walletAddress}
              readOnly
              disabled={loading}
            />
          </label>
          
          <button
            type="submit"
            disabled={loading}
            className={`mt-4 w-full py-3 rounded-lg font-bold text-lg transition-all duration-200 ${
              loading 
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                : 'bg-yellow-400 text-black hover:bg-yellow-500'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                Booking...
              </div>
            ) : (
              'Book'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookWhitelistModal; 