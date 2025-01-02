import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  image: string;
}

interface ProductGridProps {
  category: string;
  subcategory: string;
  searchTerm: string;
  className?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Luxe Velvet Sofa",
    category: "furniture",
    subcategory: "sofas",
    price: 1299,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Minimalist Wooden Almirah",
    category: "furniture",
    subcategory: "almirahs",
    price: 899,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Abstract Sunset",
    category: "paintings",
    price: 450,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Marble Top Coffee Table",
    category: "furniture",
    subcategory: "tables",
    price: 599,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    name: "Serene Landscape",
    category: "paintings",
    price: 680,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    name: "Modern Leather Recliner",
    category: "furniture",
    subcategory: "chairs",
    price: 1099,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 7,
    name: "Rustic Dining Table",
    category: "furniture",
    subcategory: "tables",
    price: 799,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 8,
    name: "Elegant Wardrobe",
    category: "furniture",
    subcategory: "almirahs",
    price: 1499,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 9,
    name: "Abstract Geometry",
    category: "paintings",
    price: 520,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 10,
    name: "Ergonomic Office Chair",
    category: "furniture",
    subcategory: "chairs",
    price: 349,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 11,
    name: "Plush Sectional Sofa",
    category: "furniture",
    subcategory: "sofas",
    price: 1899,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 12,
    name: "Coastal Sunrise",
    category: "paintings",
    price: 390,
    image: "/placeholder.svg?height=200&width=300",
  },
];

export const ProductGrid = ({
  category,
  subcategory,
  searchTerm,
  className,
}: ProductGridProps) => {
  const filteredProducts = products.filter((product) => {
    const categoryMatch = product.category === category;
    const subcategoryMatch =
      category === "furniture"
        ? subcategory === "all" || product.subcategory === subcategory
        : true;
    const searchMatch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return categoryMatch && subcategoryMatch && searchMatch;
  });

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ",
        className
      )}
    >
      {filteredProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={200}
            className="w-full  object-cover"
          />
          <CardHeader>
            <CardTitle className="font-light text-xl">{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-light text-gray-800">
              ${product.price}
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full font-light">Add to Cart</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
