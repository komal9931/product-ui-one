import React, { useEffect, useState } from "react";
import style from "./home.module.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCardClick = (id) => {
    console.log("Product ID:", id);
    navigate(`/products/${id}`);
  };

  return (
    <div className={style.container}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className={style.heading}>🛍️ Product</h1>
        <p style={{ width: "300px", marginBottom: "1rem" }}>
          Discover a wide range of products, from the latest gadgets to stylish
          apparel, all curated to suit every need and preference. Enjoy
          competitive prices, exclusive deals, and a seamless shopping
        </p>
      </div>

      {loading ? (
        <p className={style.loading}>Loading products...</p>
      ) : (
        <div className={style.grid}>
          {products.map((item) => (
            <div
              key={item.id}
              className={style.card}
              onClick={() => handleCardClick(item.id)}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className={style.image}
              />
              <h2 className={style.title}>{item.title}</h2>
              <p className={style.desc}>{item.description}</p>

              <div className={style.details}>
                <span className={style.price}>💲{item.price}</span>
                <span className={style.rating}>⭐ {item.rating}</span>
              </div>

              <button className={style.btn}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
