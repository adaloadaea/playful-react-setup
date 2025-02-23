
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Index from './pages/Index';
import Metiers from './pages/Metiers';
import MetierProducts from './pages/MetierProducts';
import Cart from './pages/Cart';
import Devis from './pages/Devis';
import Marques from './pages/Marques';
import Personalization from './pages/Personalization';
import DesignValidation from './pages/DesignValidation';
import DesignSummary from './pages/DesignSummary';
import Favorites from './pages/Favorites';
import VetementsCuisine from './pages/categories/VetementsCuisine';
import VetementsBoulanger from './pages/categories/VetementsBoulanger';
import VetementsBoucher from './pages/categories/VetementsBoucher';
import TableirsBoucher from './pages/categories/vetements-boucher/TableirsBoucher';
import VestesBoucher from './pages/categories/vetements-boucher/VestesBoucher';
import AccessoiresBoucher from './pages/categories/vetements-boucher/AccessoiresBoucher';
import VetementsHotellerie from './pages/categories/VetementsHotellerie';
import VetementsMedicaux from './pages/categories/VetementsMedicaux';
import VetementsEsthetique from './pages/categories/VetementsEsthetique';
import VetementsTravail from './pages/categories/VetementsTravail';
import Chaussures from './pages/categories/Chaussures';
import ProduitsMarketing from './pages/categories/ProduitsMarketing';
import Mugs from './pages/categories/produits-marketing/Mugs';
import Notebooks from './pages/categories/produits-marketing/Notebooks';
import Bags from './pages/categories/produits-marketing/Bags';
import Flags from './pages/categories/produits-marketing/Flags';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="metiers" element={<Metiers />} />
        <Route path="metier/:metierType" element={<MetierProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/devis" element={<Devis />} />
        <Route path="/marques" element={<Marques />} />
        <Route path="/personalization" element={<Personalization />} />
        <Route path="/design-validation" element={<DesignValidation />} />
        <Route path="/design-summary" element={<DesignSummary />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/vetements-cuisine" element={<VetementsCuisine />} />
        <Route path="/vetements-boulanger" element={<VetementsBoulanger />} />
        <Route path="/vetements-boucher" element={<VetementsBoucher />} />
        <Route path="/vetements-boucher/tabliers" element={<TableirsBoucher />} />
        <Route path="/vetements-boucher/vestes" element={<VestesBoucher />} />
        <Route path="/vetements-boucher/accessoires" element={<AccessoiresBoucher />} />
        <Route path="/vetements-hotellerie" element={<VetementsHotellerie />} />
        <Route path="/vetements-medicaux" element={<VetementsMedicaux />} />
        <Route path="/vetements-esthetique" element={<VetementsEsthetique />} />
        <Route path="/vetements-travail" element={<VetementsTravail />} />
        <Route path="/chaussures" element={<Chaussures />} />
        <Route path="/produits-marketing" element={<ProduitsMarketing />} />
        <Route path="/produits-marketing/mugs" element={<Mugs />} />
        <Route path="/produits-marketing/notebooks" element={<Notebooks />} />
        <Route path="/produits-marketing/bags" element={<Bags />} />
        <Route path="/produits-marketing/flags" element={<Flags />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
