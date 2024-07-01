import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <Button
        variant="dark"
        className="shop-now"
        size="lg"
        as={Link}
        to="/products/add"
      >
        Shop Now
      </Button>
      <div className="home-layout"></div>
    </div>
  );
};

export default Home;
