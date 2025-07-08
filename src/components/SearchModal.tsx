
import { useState, useEffect, useRef } from 'react';
import { Search, X, Clock } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { products } = useProducts();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    
    // Simulate API search with local products
    const timeoutId = setTimeout(() => {
      const results = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 8); // Limit to 8 results
      
      setSearchResults(results);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, products]);

  const handleProductClick = (product: any) => {
    // Save to recent searches
    const newRecentSearches = [product.name, ...recentSearches.filter(s => s !== product.name)].slice(0, 5);
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
    
    // Navigate to product details
    navigate(`/product/${product.id}`);
    onClose();
    setSearchTerm('');
  };

  const handleRecentSearchClick = (term: string) => {
    setSearchTerm(term);
  };

  const formatPrice = (price: number, originalPrice?: number) => {
    if (originalPrice && originalPrice > price) {
      return (
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{price} TND</span>
          <span className="text-sm text-red-500 line-through">{originalPrice} TND</span>
        </div>
      );
    }
    return <span className="font-medium text-gray-900">{price} TND</span>;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm animate-fade-in">
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-scale-in">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Recherchez des produits, collections, références..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-14 pr-14 py-6 text-lg border-0 focus:outline-none focus:ring-0 font-hm-sans placeholder-gray-500"
            />
            <button
              onClick={onClose}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Search Results */}
          {searchTerm.trim() !== '' && (
            <div className="border-t border-gray-100 max-h-96 overflow-y-auto">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
                  <p className="text-gray-600 text-sm mt-2 font-hm-sans">Recherche en cours...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="py-2">
                  <p className="text-sm text-gray-500 px-6 py-2 font-hm-sans">
                    {searchResults.length} résultat{searchResults.length > 1 ? 's' : ''} trouvé{searchResults.length > 1 ? 's' : ''}
                  </p>
                  {searchResults.map((product, index) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors group"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg bg-gray-100 group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate font-hm-sans group-hover:text-black">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-500 font-hm-sans">
                          {product.category} • {product.isNew && <span className="text-green-600">Nouveau</span>}
                          {product.isOnSale && <span className="text-red-600">Promo</span>}
                        </p>
                      </div>
                      <div className="text-right">
                        {formatPrice(product.price, product.originalPrice)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 font-hm-sans">Aucun produit trouvé pour "{searchTerm}"</p>
                  <p className="text-sm text-gray-500 mt-1 font-hm-sans">
                    Essayez avec d'autres mots-clés
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Recent Searches */}
          {searchTerm.trim() === '' && recentSearches.length > 0 && (
            <div className="border-t border-gray-100 py-4">
              <p className="text-sm text-gray-500 px-6 mb-3 flex items-center gap-2 font-hm-sans">
                <Clock className="w-4 h-4" />
                Recherches récentes
              </p>
              <div className="space-y-1">
                {recentSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(term)}
                    className="block w-full text-left px-6 py-2 text-gray-700 hover:bg-gray-50 transition-colors font-hm-sans"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Suggestions */}
          {searchTerm.trim() === '' && recentSearches.length === 0 && (
            <div className="border-t border-gray-100 py-6">
              <p className="text-sm text-gray-500 px-6 mb-3 font-hm-sans">Recherches populaires:</p>
              <div className="px-6 flex flex-wrap gap-2">
                {["Costume sur mesure", "Chemise blanche", "Cravate soie", "Veste blazer", "Pantalon costume"].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setSearchTerm(suggestion)}
                    className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors font-hm-sans text-gray-700 hover:text-black"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
