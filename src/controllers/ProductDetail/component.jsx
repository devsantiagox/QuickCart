import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../redux_store/action/productsAction";
import "./styles.scss";
import { useEffect, useState } from "react";
import { getProductsWithId } from "../FetchedItems/index";

export default function Cart() {
  const { productCart } = useSelector((state) => state);
  const [getProduct, setGetProduct] = useState({});
  const [isPresent, setPresent] = useState(false);
  const dispatch = useDispatch();
  let { productId } = useParams();

  useEffect(() => {
    async function fetchProduct(productId) {
      let fetchedProduct = await getProductsWithId(productId);
      setGetProduct(fetchedProduct.data);
    }
    fetchProduct(productId);
  }, [productId]);

  useEffect(() => {
    let obj = productCart.find(
      (item) => parseInt(item.id) === parseInt(productId)
    );
    setPresent(!!obj);
  }, [productId, productCart]);

  function handleAddToCart(id) {
    dispatch(increment(id));
    setPresent(true);
  }

  return (
    <div className="product_details">
      <div className="left_product_details">
        <img src={getProduct?.image} alt={getProduct?.title} />
        <div className="card__button">
          {!isPresent ? (
            <button
              className="addToCart_button"
              onClick={() => handleAddToCart(productId)}
            >
              Agregar al carrito
            </button>
          ) : (
            <Link to="/cart">
              <button className="addToCart_button">Ir al carrito</button>
            </Link>
          )}
          <Link to="/cart">
            <button
              onClick={() => handleAddToCart(productId)}
              className="buyNow_button"
            >
              Comprar Ahora
            </button>
          </Link>
        </div>
      </div>
      <div className="right_product_details">
        <div className="title">{getProduct?.title}:</div>
        <div className="price">
          <span className="rupee">$</span>
          {getProduct?.price}
        </div>
        <div className="rating">
          {getProduct?.rating?.rate} <span className="start_icon">★</span>
        </div>
        <div className="description">
          <h4>Detalles del producto:</h4>
          <div className="product__description">{getProduct?.description}</div>
        </div>
      </div>
    </div>
  );
}