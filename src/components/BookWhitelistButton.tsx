import React from 'react';

interface BookWhitelistButtonProps {
  onClick: () => void;
}

const BookWhitelistButton: React.FC<BookWhitelistButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed left-1/2 top-1/2 z-[100] -translate-x-1/2 -translate-y-1/2 px-8 py-4 text-white border-2 border-yellow-400 rounded-full bg-white bg-opacity-10 backdrop-blur-md shadow-lg hover:bg-yellow-400 hover:text-black transition-all duration-300 text-xl font-semibold"
      style={{ boxShadow: '0 4px 32px 0 rgba(0,0,0,0.25)' }}
    >
      Book Whitelist
    </button>
  );
};

export default BookWhitelistButton; 