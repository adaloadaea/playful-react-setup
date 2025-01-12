import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Truck, CreditCard, Clock } from 'lucide-react';
import { useCart } from './CartProvider';

interface OrderSummaryProps {
  userDetails: UserDetails | null;
  cartItems: any[];
  onEditDetails?: () => void;
  onDeleteDetails?: () => void;
}

const OrderSummary = ({ 
  userDetails,
  cartItems,
  onEditDetails,
  onDeleteDetails
}: OrderSummaryProps) => {
  const [discountCode, setDiscountCode] = useState('');
  const { calculateTotal, hasNewsletterDiscount } = useCart();
  const { 
    subtotal, 
    discount: newsletterDiscount, 
    total, 
    boxTotal,
    packBoxTotal,
    individualBoxTotal 
  } = calculateTotal();
  
  const shipping = subtotal > 299 ? 0 : 8;
  const finalTotal = total + shipping;

  // Group pack items to show box prices
  const packGroups = cartItems.reduce((groups, item) => {
    if (item.fromPack && item.packType) {
      if (!groups[item.packType]) {
        groups[item.packType] = {
          items: [],
          boxPrice: item.boxPrice || 0
        };
      }
      groups[item.packType].items.push(item);
    }
    return groups;
  }, {} as Record<string, { items: CartItem[], boxPrice: number }>);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="lg:col-span-1"
    >
      <div className="bg-white rounded-lg shadow-sm p-6 sticky top-32 border border-gray-100">
        {userDetails && (
          <div className="mb-6 p-4 bg-[#F1F0FB] rounded-md relative group">
            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {onEditDetails && (
                <button
                  onClick={onEditDetails}
                  className="p-1 hover:bg-white rounded-full mr-1 transition-colors"
                  title="Modifier"
                >
                  <Pencil size={16} className="text-[#700100]" />
                </button>
              )}
              {onDeleteDetails && (
                <button
                  onClick={onDeleteDetails}
                  className="p-1 hover:bg-white rounded-full transition-colors"
                  title="Supprimer"
                >
                  <Trash2 size={16} className="text-[#700100]" />
                </button>
              )}
            </div>
            <h3 className="font-medium text-[#1A1F2C] mb-2">Informations de livraison</h3>
            <p className="text-sm text-[#8E9196]">
              {userDetails.firstName} {userDetails.lastName}<br />
              {userDetails.address}<br />
              {userDetails.zipCode} {userDetails.country}<br />
              {userDetails.phone}<br />
              {userDetails.email}
            </p>
          </div>
        )}

        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-[#8E9196]">
            <span>Sous-total articles</span>
            <span>{subtotal.toFixed(2)} TND</span>
          </div>
          
          {Object.entries(packGroups).map(([packType, { boxPrice }]) => (
            <div key={packType} className="flex justify-between text-[#8E9196]">
              <span>Boîte {packType}</span>
              <span className="flex items-center">
                {boxPrice === 0 ? (
                  <span className="text-green-600">Gratuite</span>
                ) : (
                  `${boxPrice.toFixed(2)} TND`
                )}
              </span>
            </div>
          ))}
          
          {individualBoxTotal > 0 && (
            <div className="flex justify-between text-[#8E9196]">
              <span>Boîtes individuelles</span>
              <span>{individualBoxTotal.toFixed(2)} TND</span>
            </div>
          )}
          
          <div className="flex justify-between text-[#8E9196]">
            <span>Livraison</span>
            <span>{shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} TND`}</span>
          </div>
          
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex justify-between text-lg font-medium text-[#1A1F2C]">
              <span>Total</span>
              <span>{finalTotal.toFixed(2)} TND</span>
            </div>
            <p className="text-xs text-[#8E9196] mt-1">TVA incluse</p>
          </div>
        </div>
        
        <PaymentButtons 
          enabled={!!userDetails}
          cartItems={cartItems}
          userDetails={userDetails}
          total={subtotal}
          shipping={shipping}
          finalTotal={finalTotal}
          hasPersonalization={cartItems.some(item => item.personalization)}
        />

        <div className="mt-6 space-y-2 text-sm text-[#8E9196]">
          <p className="flex items-center gap-2 hover:text-[#1A1F2C] transition-colors">
            • Livraison gratuite à partir de 299 TND
          </p>
          <p className="flex items-center gap-2 hover:text-[#1A1F2C] transition-colors">
            • Retours gratuits sous 14 jours
          </p>
          <p className="flex items-center gap-2 hover:text-[#1A1F2C] transition-colors">
            • Service client disponible 24/7
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
