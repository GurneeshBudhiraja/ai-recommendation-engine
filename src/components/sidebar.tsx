import { Button } from "@/components/ui/button";

interface SidebarProps {
  selectedCategory: "Sofa" | "Wardrobe" | "Painting";
  setSelectedCategory: (category: "Sofa" | "Wardrobe" | "Painting") => void;
}

export const Sidebar = ({
  selectedCategory,
  setSelectedCategory,
}: SidebarProps) => {
  return (
    <div className="w-64 bg-white p-8 shadow-md">
      <h2 className="text-2xl font-extralight mb-6 text-gray-800">
        Categories
      </h2>
      <div className="space-y-2">
        <Button
          variant={selectedCategory === "Sofa" ? "default" : "ghost"}
          className="w-full justify-start font-light"
          onClick={() => setSelectedCategory("Sofa")}
        >
          Sofa
        </Button>
        <Button
          variant={selectedCategory === "Wardrobe" ? "default" : "ghost"}
          className="w-full justify-start font-light"
          onClick={() => setSelectedCategory("Wardrobe")}
        >
          Wardrobe
        </Button>
        <Button
          variant={selectedCategory === "Painting" ? "default" : "ghost"}
          className="w-full justify-start font-light"
          onClick={() => setSelectedCategory("Painting")}
        >
          Painting
        </Button>
      </div>
    </div>
  );
};
