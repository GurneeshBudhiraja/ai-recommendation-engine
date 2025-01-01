"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { FurnitureTopBar } from "@/components/furniture-top-bar";
import { ProductGrid } from "@/components/product-grid";
import HomeHeaderActions from "@/components/home-header-actions";
import SearchBar from "@/components/search-bar";
import { cn } from "@/lib/utils";
import AISearchBar from "@/components/ai-search-bar";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("furniture");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [aiSearch, setAISearch] = useState<boolean>(false);

  return (
    <div className="flex h-screen bg-gray-50 font-light">
      <Sidebar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="flex-1 overflow-auto">
        <div className="p-8 relative">
          <div className="inline-flex justify-between items-start  w-full ">
            <h1 className="text-4xl font-extralight mb-8 text-gray-800">
              Elegant Living
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
              className={cn("w-full", {
                "fixed flex inset-0 items-center justify-center z-50 ":
                  aiSearch,
              })}
            >
              <div
                className={cn("w-full max-w-2xl", {
                  "h-2/3 bg-white rounded-3xl border border-gray-300 shadow-lg p-6 flex ":
                    aiSearch,
                })}
              >
                <AISearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  aiSearch={aiSearch}
                  setAISearch={setAISearch}
                />
              </div>
            </div>
          )}
          {selectedCategory === "furniture" && (
            <FurnitureTopBar
              selectedSubcategory={selectedSubcategory}
              setSelectedSubcategory={setSelectedSubcategory}
            />
          )}
          <ProductGrid
            category={selectedCategory}
            subcategory={selectedSubcategory}
            searchTerm={!aiSearch ? searchTerm : ""}
            className={cn("transition-opacity ease-in-out duration-200", {
              "opacity-50": aiSearch,
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
