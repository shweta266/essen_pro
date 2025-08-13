import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Product } from '../../types/Product';
import { motion, AnimatePresence } from 'framer-motion';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex justify-center items-start z-50 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mt-6 sm:mt-10 md:mt-16 w-[95%] max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>

              <div className="flex flex-col md:flex-row h-full">
                {/* Image Section */}
                <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 p-4 sm:p-6 overflow-y-auto">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h2>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-accent-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-accent-500'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      ({product.reviewCount} reviews)
                    </span>
                  </div>

                  <div className="mb-4">
                    {product.compareAtPrice && (
                      <span className="text-lg text-gray-500 line-through mr-2">
                        ${product.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="text-2xl font-bold text-primary-600">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-6">
                    {product.description || 'No description available.'}
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 border rounded-md hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="text-gray-700">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1 border rounded-md hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        onAddToCart(product, quantity);
                        onClose();
                      }}
                      className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
                    >
                      Add to Cart ({quantity} item{quantity > 1 ? 's' : ''})
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors">
                      Add to Wishlist
                    </button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Product Details
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>Category: {product.category}</li>
                      {product.isNew && <li>New Arrival</li>}
                      {product.isBestSeller && <li>Best Seller</li>}
                      {product.isOrganic && <li>Organic Product</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal; 