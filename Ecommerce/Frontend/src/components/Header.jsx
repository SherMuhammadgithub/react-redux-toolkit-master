import React from "react";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import SmallProduct from "../pages/products/SmallProduct";
import ProductCarousel from "../pages/products/ProductCarousel";
import Loader from "./Loader";
export default function Header() {
  const { data, isLoading, error } = useGetTopProductsQuery();
  if (isLoading) return <Loader />;
  if (error) return <div>Error Loading data</div>;
  return (
    <div className="flex justify-around">
      <div className="xl:block lg:hidden md:hidden:sm:hidden">
        <div className="grid grid-cols-2">
          {data.map((product) => (
            <div key={product._id}>
              <SmallProduct product={product} />
            </div>
          ))}
        </div>
      </div>
      <ProductCarousel />
    </div>
  );
}
