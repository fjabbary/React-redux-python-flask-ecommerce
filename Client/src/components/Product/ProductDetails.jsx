import React from "react";
import { useGetOneProductQuery } from "../../features/api/productSlice";

const ProductDetails = () => {
  const { data, isLoading, isError } = useGetOneProductQuery(1);
  console.log(data);

  return <div>ProductDetails</div>;
};

export default ProductDetails;
