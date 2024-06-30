import { useGetAllProductsQuery } from "../../features/api/productSlice";

const Products = () => {
  const { data, error, isError, isLoading } = useGetAllProductsQuery();

  return <div>Products</div>;
};

export default Products;
