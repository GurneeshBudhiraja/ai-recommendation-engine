import { Button } from "@/components/ui/button";

interface FurnitureTopBarProps {
  selectedSubcategory: string;
  setSelectedSubcategory: (subcategory: string) => void;
}

export const FurnitureTopBar = ({
  selectedSubcategory,
  setSelectedSubcategory,
}: FurnitureTopBarProps) => {
  const subcategories = ["all", "sofas", "almirahs"];

  return (
    <div className="mb-8 flex space-x-2">
      {subcategories.map((subcategory) => (
        <Button
          key={subcategory}
          variant={selectedSubcategory === subcategory ? "default" : "outline"}
          className="font-light"
          onClick={() => setSelectedSubcategory(subcategory)}
        >
          {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
        </Button>
      ))}
    </div>
  );
};
