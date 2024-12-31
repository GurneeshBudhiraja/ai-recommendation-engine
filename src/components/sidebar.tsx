import { Button } from "@/components/ui/button";

interface SidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
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
          variant={selectedCategory === "furniture" ? "default" : "ghost"}
          className="w-full justify-start font-light"
          onClick={() => setSelectedCategory("furniture")}
        >
          Furniture
        </Button>
        <Button
          variant={selectedCategory === "paintings" ? "default" : "ghost"}
          className="w-full justify-start font-light"
          onClick={() => setSelectedCategory("paintings")}
        >
          Paintings
        </Button>
      </div>
    </div>
  );
};
