import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import style from "./products.module.css";

const Products = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchRelated = async () => {
      if (product?.category) {
        try {
          const res = await fetch(
            `https://dummyjson.com/products/category/${product.category}`
          );
          const data = await res.json();
          // filter out the current product itself
          const filtered = data.products.filter((p) => p.id !== product.id);
          setRelated(filtered.slice(0, 4)); // show 4 related
        } catch (error) {
          console.error("Error fetching related products:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRelated();
  }, [product]);

  if (loading || !product)
    return <p className={style.loading}>Loading product...</p>;

  return (
    <div className={style.page}>
      {/* MAIN PRODUCT SECTION */}
      <div className={style.container}>
        <div className={style.imageContainer}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className={style.image}
          />
        </div>

        <div className={style.details}>
          <h1 className={style.title}>{product.title}</h1>
          <p className={style.price}>Rs. {product.price}.00</p>

          <div className={style.sizeSection}>
            <p>Size</p>
            <div className={style.sizes}>
              {["S", "M", "L", "XL", "2XL"].map((size) => (
                <button
                  key={size}
                  className={`${style.sizeBtn} ${
                    selectedSize === size ? style.activeSize : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className={style.quantityContainer}>
            <button
              onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
              className={style.qtyBtn}
            >
              −
            </button>
            <span className={style.qty}>{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className={style.qtyBtn}
            >
              +
            </button>
          </div>

          <div className={style.actionButtons}>
            <button className={style.addCartBtn}>🛒 Add to cart</button>
            <button className={style.buyNowBtn}>Buy it now</button>
          </div>

          <div className={style.extraInfo}>
            <p>🚚 Reliable shipping</p>
            <p>🔁 Easy exchange</p>
          </div>

          <p className={style.desc}>{product.description}</p>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className={style.relatedSection}>
        <h2>Related Products</h2>
        <div className={style.relatedGrid}>
          {related.map((item) => (
            <Link
              to={`/products/${item.id}`}
              key={item.id}
              className={style.card}
            >
              <div className={style.cardImageWrap}>
                <img src={item.thumbnail} alt={item.title} />
              </div>
              <div className={style.cardBody}>
                <p className={style.cardTitle}>{item.title}</p>
                <p className={style.cardPrice}>Rs. {item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
