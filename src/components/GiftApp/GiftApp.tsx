import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from "../cart/CartProvider";
import { toast } from "@/hooks/use-toast";
import { playTickSound } from "@/utils/audio";
import ProductSelectionPanel from "./ProductSelectionPanel";
import GiftBasket3D from "./GiftBasket3D";
import PackSummary from "./PackSummary";
import ConfirmationButton from "./ConfirmationButton";
import { Product } from "@/types/product";
import PackTypeHeader from "./components/PackTypeHeader";
import { validatePackSelection } from "./components/PackValidation";
import { getPackPrice } from "./components/PackPricing";

export interface GiftPack {
  items: Product[];
  totalPrice: number;
  note?: string;
}

const GiftApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);
  const [packNote, setPackNote] = useState("");
  const [selectedContainerIndex, setSelectedContainerIndex] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const packType = React.useMemo(() => {
    const path = location.pathname;
    if (path.includes('packprestige')) return 'Pack Prestige';
    if (path.includes('packpremium')) return 'Pack Premium';
    if (path.includes('packtrio')) return 'Pack Trio';
    if (path.includes('packduo')) return 'Pack Duo';
    if (path.includes('packminiduo')) return 'Pack Mini Duo';
    if (path.includes('packchemise')) return 'Pack Chemise';
    return 'Pack Trio';
  }, [location]);

  const containerCount = React.useMemo(() => {
    if (packType === 'Pack Chemise') return 1;
    return ['Pack Duo', 'Pack Mini Duo'].includes(packType) ? 2 : 3;
  }, [packType]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleConfirmPack = async () => {
    if (!validatePackSelection(selectedItems, containerCount, packType)) {
      return;
    }

    setIsLoading(true);
    const packPrice = getPackPrice(packType);
    
    if (packPrice > 0) {
      addToCart({
        id: Date.now(),
        name: `${packType} - Frais de packaging`,
        price: packPrice,
        quantity: 1,
        image: "/Menu/Sur musure .png",
        type_product: "Pack",
        itemgroup_product: "Pack",
        size: "-",
        color: "-",
        personalization: "-",
        pack: "aucun",
      });
    }
    
    for (const item of selectedItems) {
      await new Promise(resolve => setTimeout(resolve, 500));
      addToCart({
        ...item,
        quantity: 1,
        personalization: item.personalization || '-',
        pack: packType,
        size: item.size || '-',
        color: item.color || '-'
      });
    }

    toast({
      title: "Pack Ajouté au Panier! 🎉",
      description: packPrice > 0 
        ? `Pack et frais de packaging (${packPrice} TND) ajoutés au panier`
        : "Pack ajouté au panier",
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });

    setIsLoading(false);
    navigate('/cart');
  };

  const handleItemDrop = (item: Product) => {
    if (selectedItems.length >= containerCount) {
      toast({
        title: "Pack complet",
        description: `Ce pack ne peut contenir que ${containerCount} articles`,
        variant: "destructive",
      });
      return;
    }

    const itemWithDetails = {
      ...item,
      fromPack: true,
      pack: packType
    };

    setSelectedItems((prev) => [...prev, itemWithDetails]);
    playTickSound();
    toast({
      title: "Article Ajouté! 🎁",
      description: "N'oubliez pas que vous pouvez ajouter un message personnalisé à votre pack!",
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b bg-[#f6f7f9] py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <PackTypeHeader packType={packType} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 h-full">
            <ProductSelectionPanel 
              onItemDrop={handleItemDrop}
              packType={packType}
              selectedContainerIndex={selectedContainerIndex}
              selectedItems={selectedItems}
            />
          </div>

          <div className="lg:col-span-5">
            <GiftBasket3D 
              items={selectedItems}
              onItemDrop={handleItemDrop}
              containerCount={containerCount}
              onContainerSelect={setSelectedContainerIndex}
            />
          </div>

          <div className="lg:col-span-3">
            <PackSummary
              items={selectedItems}
              note={packNote}
              onNoteChange={setPackNote}
            />
            <ConfirmationButton
              onConfirm={handleConfirmPack}
              disabled={selectedItems.length === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftApp;