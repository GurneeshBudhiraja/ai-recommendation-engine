"use client";

import { useEffect, useState } from "react";
import { ProductGrid } from "@/components/product-grid";
import HomeHeaderActions from "@/components/home-header-actions";
import SearchBar from "@/components/search-bar";
import { cn } from "@/lib/utils";
import AISearchBar from "@/components/ai-search-bar";
import { getProduct, ProductType } from "@/utils/getProducts";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";

// TODO: will move to the types folder
export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageURL: string;
};

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    "Sofa" | "Wardrobe" | "Painting"
  >("Sofa");
  const [searchTerm, setSearchTerm] = useState("");
  const [aiSearch, setAISearch] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    getProduct(
      {
        cursor: "",
        limit: "",
        type: selectedCategory.toLowerCase() as ProductType,
      },
      setProducts,
      setLoading,
      setCursor
    );
  }, [selectedCategory]);
  return (
    <div className="flex h-screen bg-gray-50 font-light">
      <Sidebar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="flex-1 overflow-auto">
        <div className="p-8 relative h-full ">
          <div className="inline-flex justify-between items-start w-full  ">
            <h1 className="text-4xl font-extralight mb-8 text-gray-800">
              Elegant Living
              <span className="text-lg ml-2 font-light">
                {selectedCategory}
              </span>
            </h1>
            <HomeHeaderActions />
          </div>
          {/* When the aiSearch is off */}
          {!aiSearch ? (
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              aiSearch={aiSearch}
              setAISearch={setAISearch}
            />
          ) : (
            <div
              className={cn(
                "w-full fixed flex inset-0 items-center justify-center z-50 bg-zinc-900/40 "
              )}
            >
              <div
                className={cn(
                  "w-full max-w-2xl h-2/3 bg-white rounded-3xl border border-gray-300 shadow-lg p-6 flex "
                )}
              >
                <AISearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  aiSearch={aiSearch}
                  setAISearch={setAISearch}
                />
              </div>
            </div>
          )}{" "}
          {loading ? (
            <div className="w-full h-1/2 inline-flex items-center justify-center font-semibold opacity-65 tracking-wide text-2xl">
              Loading...
            </div>
          ) : (
            <div
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all ease-in-out duration-500 mb-7",
                { "opacity-0": loading },
                { "opacity-100": !loading }
              )}
            >
              {products &&
                products.map((product, index) => (
                  <ProductGrid key={index} product={product} />
                ))}
            </div>
          )}
          <span
            className="inline-flex justify-center items-center mb-9 w-full"
            onClick={() => {
              setLoading(true);
              getProduct(
                {
                  limit: "",
                  cursor: cursor,
                  type: selectedCategory.toLowerCase() as ProductType,
                },
                setProducts,
                setLoading,
                setCursor
              );
            }}
          >
            <Button>View More</Button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
