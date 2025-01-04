import { type Product } from "@/app/page";
import axios from "axios";

export type ProductType = "sofa" | "wardrobe" | "painting"

export type GetProduct = {
  limit: number | "",
  type: ProductType,
  cursor: string,
}
export async function getProduct({ limit, type, cursor }: GetProduct, setProducts: React.Dispatch<React.SetStateAction<Product[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setCursor: React.Dispatch<React.SetStateAction<string>>) {
  const dbProductData = await axios.get(`/api/v1/items?limit=${limit}&type=${type}&cursor=${cursor}`)
  console.log(dbProductData.data.data[0])
  setCursor(dbProductData.data.cursor)
  setProducts([...dbProductData.data.data])
  setLoading(false)
  return;
}