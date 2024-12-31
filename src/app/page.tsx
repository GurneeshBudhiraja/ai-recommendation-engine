"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/sidebar";
import { FurnitureTopBar } from "@/components/furniture-top-bar";
import { ProductGrid } from "@/components/product-grid";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("furniture");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex h-screen bg-gray-50 font-light">
      <Sidebar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-4xl font-extralight mb-8 text-gray-800">
            Elegant Living
          </h1>

          <div className="mb-6 flex items-center">
            <Input
              type="text"
              placeholder="Search products..."
              className="mr-2 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline">Search</Button>
          </div>
          {selectedCategory === "furniture" && (
            <FurnitureTopBar
              selectedSubcategory={selectedSubcategory}
              setSelectedSubcategory={setSelectedSubcategory}
            />
          )}
          <ProductGrid
            category={selectedCategory}
            subcategory={selectedSubcategory}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
