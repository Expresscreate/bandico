import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Minus, Plus, Trash2, ChevronRight, ArrowRight } from 'lucide-react';
import { useCart } from './CartContext';

const CartModal: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateQuantity, 
    removeFromCart, 
    cartSubtotal, 
    tvaAmount, 
    cartTotal 
  } = useCart();

  const handleCheckout = () => {
    const now = new Date();
    const orderNumber = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
    
    let message = `🛒 *NOUVELLE COMMANDE BANDICO SHOP*\n`;
    message += `🔢 Numéro: ${orderNumber}\n`;
    message += `---------------------------\n`;
    cart.forEach(item => {
      message += `• ${item.name} x${item.quantity} : ${(item.price * item.quantity).toLocaleString()} FCFA\n`;
    });
    message += `---------------------------\n`;
    message += `💰 Sous-total: ${cartSubtotal.toLocaleString()} FCFA\n`;
    message += `📊 TVA (19.25%): ${tvaAmount.toLocaleString()} FCFA\n`;
    message += `✅ *TOTAL TTC: ${cartTotal.toLocaleString()} FCFA*\n\n`;
    message += `Merci de prendre en charge ma commande.`;

    const number = "+237691728282";
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[2000] flex items-end md:items-center justify-center md:p-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-gray-900/40 backdrop-blur-md" />
          <motion.div 
            initial={{ y: "100%" }} 
            animate={{ y: 0 }} 
            exit={{ y: "100%" }} 
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-white w-full max-w-2xl h-[90vh] md:h-auto md:max-h-[85vh] rounded-t-[3rem] md:rounded-[3.5rem] relative shadow-2xl z-10 flex flex-col overflow-hidden"
          >
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20">
              <div className="flex items-center gap-4">
                <div className="bg-[#c8a849]/10 p-3 rounded-2xl">
                  <ShoppingBag className="w-6 h-6 text-[#c8a849]" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900">Mon Panier</h2>
                  <p className="text-sm text-gray-400 font-light">{cart.length} article(s)</p>
                </div>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="bg-gray-100 hover:bg-gray-200 p-2.5 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-900" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-8 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="w-10 h-10 text-gray-200" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Votre panier est vide</h3>
                  <p className="text-gray-500 font-light mb-8">Découvrez nos produits et commencez vos achats.</p>
                  <button onClick={() => setIsCartOpen(false)} className="text-[#2f6c44] font-bold flex items-center gap-2 mx-auto hover:gap-3 transition-all">
                    Continuer mes achats <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-6 items-center p-4 bg-gray-50 rounded-3xl group border border-transparent hover:border-gray-200 transition-all">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-white">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-gray-900 mb-1">{item.name}</h4>
                      <p className="text-[#2f6c44] font-black text-sm mb-3">{item.priceFormatted}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors"><Minus className="w-4 h-4 text-gray-400" /></button>
                          <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors"><Plus className="w-4 h-4 text-gray-400" /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors p-2"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter mb-1">Total</p>
                      <p className="font-black text-gray-900">{(item.price * item.quantity).toLocaleString()} FCFA</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 bg-white border-t border-gray-100 shadow-[0_-20px_40px_rgba(0,0,0,0.02)]">
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-gray-500 font-light">
                    <span>Sous-total HT</span>
                    <span className="font-bold">{cartSubtotal.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-light">
                    <span>TVA (19.25%)</span>
                    <span className="font-bold">{tvaAmount.toLocaleString()} FCFA</span>
                  </div>
                  <div className="w-full h-px bg-gray-100 my-4"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-black text-gray-900 uppercase tracking-widest text-sm">Total TTC</span>
                    <span className="text-3xl font-black text-[#2f6c44]">{cartTotal.toLocaleString()} FCFA</span>
                  </div>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-[#1a2e22] hover:bg-gray-900 text-white font-bold py-6 rounded-[2rem] shadow-2xl shadow-emerald-900/30 flex items-center justify-center gap-4 transition-all hover:-translate-y-1 active:scale-[0.98]"
                >
                  Commander via WhatsApp <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
