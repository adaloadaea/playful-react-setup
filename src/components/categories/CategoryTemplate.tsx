import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projectExamples } from '@/config/examplesConfig';

interface CategoryTemplateProps {
  data: {
    title: string;
    description: string;
    bannerImage: string;
    features: Array<{
      title: string;
      description: string;
    }>;
    products: Array<{
      id: string;
      name: string;
      description: string;
      price: number;
      image: string;
    }>;
  };
  parentPath: string;
  parentName: string;
}

const ITEMS_PER_PAGE = 6;

const CategoryTemplate = ({ data, parentPath, parentName }: CategoryTemplateProps) => {
  const [sortOption, setSortOption] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const sortProducts = (products: typeof data.products) => {
    switch (sortOption) {
      case "price-asc":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...products].sort((a, b) => b.price - a.price);
      case "name-asc":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts(data.products);
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-rich-black to-rich-black/95">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8 text-sm text-gold-400">
          <Link to={parentPath}>
            <Button variant="ghost" size="sm" className="gap-2 text-gold-400 hover:text-gold-300">
              <ChevronLeft className="h-4 w-4" />
              Retour aux {parentName}
            </Button>
          </Link>
        </div>

        <div className="relative rounded-xl overflow-hidden mb-12 luxury-card">
          <img 
            src={data.bannerImage}
            alt={data.title}
            className="w-full h-[300px] md:h-[400px] object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gold-400 gold-text-shadow font-playfair">
                {data.title}
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto text-off-white">
                {data.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {data.features.map((feature, index) => (
            <div key={index} className="luxury-card p-6 rounded-lg transition-all duration-300 hover:gold-glow">
              <h3 className="font-semibold text-lg mb-2 text-gold-400">{feature.title}</h3>
              <p className="text-off-white/80">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-gold-400 font-playfair">Nos Réalisations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectExamples.map((example) => (
              <div key={example.id} className="luxury-card overflow-hidden rounded-lg group">
                <div className="aspect-square">
                  <img
                    src={example.image}
                    alt={example.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-gold-400 font-medium mb-2">{example.title}</h3>
                  <p className="text-sm text-off-white/70 line-clamp-2">{example.description}</p>
                  <div className="mt-2 text-xs text-gold-400/80">
                    {example.client} • {example.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gold-400 font-playfair">Notre Collection</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-off-white">Trier par</span>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px] border-gold-600/20 bg-rich-black text-off-white">
                <SelectValue placeholder="Recommandé" />
              </SelectTrigger>
              <SelectContent className="bg-rich-black border-gold-600/20">
                <SelectItem value="recommended">Recommandé</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="name-asc">Nom A-Z</SelectItem>
                <SelectItem value="name-desc">Nom Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedProducts.map((product) => (
            <div 
              key={product.id} 
              className="luxury-card group rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:gold-glow"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-gradient-to-r from-gold-600 to-gold-500 text-rich-black px-3 py-1 rounded-full text-sm font-medium">
                  DÉSTOCKAGE -30%
                </span>
              </div>
              
              <div className="aspect-square bg-rich-black/50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 text-gold-400">{product.name}</h3>
                <p className="text-off-white/70 text-sm mb-3">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-off-white/50">À partir de</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gold-400">{product.price.toFixed(2)} €</span>
                      <span className="text-sm text-off-white/50 line-through">
                        {(product.price * 1.3).toFixed(2)} €
                      </span>
                    </div>
                  </div>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/devis');
                    }}
                    className="bg-gold-600 hover:bg-gold-500 text-rich-black"
                  >
                    Demander un devis
                  </Button>
                </div>
                <div className="mt-3 flex items-center gap-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 text-gold-400 fill-gold-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-off-white/50">(4 avis)</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={currentPage === page 
                  ? "bg-gold-600 hover:bg-gold-500 text-rich-black" 
                  : "border-gold-600/20 text-gold-400 hover:bg-gold-600/10"
                }
              >
                {page}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryTemplate;
