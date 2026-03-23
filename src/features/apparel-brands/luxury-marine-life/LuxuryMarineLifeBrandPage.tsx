import "./styles/App.css";
import Navigation from "./sections/Navigation";
import Hero from "./sections/Hero";
import CollectionGrid from "./sections/CollectionGrid";
import CartDrawer from "./sections/CartDrawer";
import ProductDetail from "./sections/ProductDetail";
import AllProducts from "./sections/AllProducts";
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
            <CollectionGrid />
          </>
        )}
        {currentView === "product" && <ProductDetail />}
        {currentView === "products" && <AllProducts />}
      </main>
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

