import "./styles/App.css";
import Navigation from "./sections/Navigation";
import Hero from "./sections/Hero";
import LifestyleAuthority from "./sections/LifestyleAuthority";
import CollectionGrid from "./sections/CollectionGrid";
import SustainabilityStory from "./sections/SustainabilityStory";
import CartDrawer from "./sections/CartDrawer";
import ProductDetail from "./sections/ProductDetail";
import AllProducts from "./sections/AllProducts";
import Footer from "./sections/Footer";
import { StoreProvider, useStore } from "./context/StoreContext";

function LmlHome() {
  const { currentView } = useStore();

  return (
    <div className="min-h-screen bg-[#f8f6f3]">
      <Navigation />
      <CartDrawer />

      <main>
        {currentView === "home" && (
          <>
            <Hero />
            <LifestyleAuthority />
            <CollectionGrid />
            <SustainabilityStory />
          </>
        )}
        {currentView === "product" && <ProductDetail />}
        {currentView === "products" && <AllProducts />}
      </main>

      {currentView === "home" && (
        <>
          <Footer />
        </>
      )}
      {currentView !== "home" && <Footer />}
    </div>
  );
}

export function LuxuryMarineLifeBrandPage() {
  return (
    <StoreProvider>
      <LmlHome />
    </StoreProvider>
  );
}

