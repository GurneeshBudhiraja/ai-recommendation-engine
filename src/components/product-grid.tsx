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
import { type Product } from "@/app/page";

export type ProductGridPropsType = {
  product: Product;
};

export const ProductGrid = ({ product }: ProductGridPropsType) => {
  return (
    <div className={cn("")} id={product._id}>
      <Card className="overflow-hidden">
        <Image
          src={product.imageURL || "placeholder.svg"}
          alt={product.name || ""}
          width={300}
          loading="lazy"
          height={200}
          className="w-full object-cover"
        />
        <CardHeader>
          <CardTitle className="font-light text-xl">{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-light text-gray-800">{product.price}</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full font-light">Add to Cart</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
