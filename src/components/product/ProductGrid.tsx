import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../../types/Product';

interface ProductGridProps {
  products: Product[];
  viewMode?: 'grid' | 'list';
  title?: string;
  subtitle?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, viewMode = 'grid', title, subtitle }) => {
  return (
    <div className="w-full">
      {/* Render title and subtitle if provided */}
      {(title || subtitle) && (
        <div className="mb-6 text-center">
          {title && <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>}
          {subtitle && <p className="mt-1 text-gray-600">{subtitle}</p>}
        </div>
      )}

      <div className="w-full">
        {viewMode === 'grid' ? (
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 pb-4">
            {products.map((product) => (
              <div key={product.id} className="w-[300px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-full sm:w-1/3 relative aspect-square">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 bg-white rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
                  />
                  {product.isNew && (
                    <span className="absolute top-2 left-2 bg-secondary-600 text-white text-xs px-2 py-1 rounded-sm">
                      New
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="absolute top-2 left-2 bg-accent-600 text-white text-xs px-2 py-1 rounded-sm">
                      Best Seller
                    </span>
                  )}
                </div>

                <div className="p-4 sm:p-6 flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
                      {product.compareAtPrice && (
                        <span className="text-sm text-gray-500 line-through">₹{product.compareAtPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 sm:py-16 px-4 sm:px-6">
          <h3 className="text-base sm:text-lg font-medium text-neutral-900 mb-2">No products found</h3>
          <p className="text-sm sm:text-base text-neutral-600">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
