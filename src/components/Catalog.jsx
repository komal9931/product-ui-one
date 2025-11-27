// import React, { useEffect, useState } from "react";
// import style from "./catalog.module.css";

// const ChevronDown = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <polyline points="6 9 12 15 18 9" />
//   </svg>
// );

// const Catalog = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [availability, setAvailability] = useState("all"); // all, inStock, outOfStock
//   const [priceSort, setPriceSort] = useState(""); // asc, desc
//   const [sortType, setSortType] = useState(""); // name, rating, etc.

//   // Fetch data
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("https://dummyjson.com/products?limit=9");
//         const data = await res.json();
//         setProducts(data.products);
//         setFilteredProducts(data.products);
//       } catch (err) {
//         console.error("Failed to fetch products:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Apply filters/sorts
//   useEffect(() => {
//     let updated = [...products];

//     // Availability
//     if (availability === "inStock") {
//       updated = updated.filter((p) => p.stock > 0);
//     } else if (availability === "outOfStock") {
//       updated = updated.filter((p) => p.stock === 0);
//     }

//     // Price sort
//     if (priceSort === "asc") {
//       updated.sort((a, b) => a.price - b.price);
//     } else if (priceSort === "desc") {
//       updated.sort((a, b) => b.price - a.price);
//     }

//     // General sort (optional)
//     if (sortType === "name") {
//       updated.sort((a, b) => a.title.localeCompare(b.title));
//     } else if (sortType === "rating") {
//       updated.sort((a, b) => b.rating - a.rating);
//     }

//     setFilteredProducts(updated);
//   }, [availability, priceSort, sortType, products]);

//   if (loading) return <div className={style.loading}>Loading...</div>;

//   return (
//     <div className={style.catalogWrapper}>
//       <h1 className={style.title}>Products</h1>

//       {/* Filters */}
//       <div className={style.filterBar}>
//         <div className={style.filters}>
//           <div className={style.dropdown}>
//             <button className={style.filterBtn}>
//               Availability <ChevronDown />
//             </button>
//             <div className={style.dropdownMenu}>
//               <button onClick={() => setAvailability("all")}>All</button>
//               <button onClick={() => setAvailability("inStock")}>
//                 In Stock
//               </button>
//               <button onClick={() => setAvailability("outOfStock")}>
//                 Out of Stock
//               </button>
//             </div>
//           </div>

//           <div className={style.dropdown}>
//             <button className={style.filterBtn}>
//               Price <ChevronDown />
//             </button>
//             <div className={style.dropdownMenu}>
//               <button onClick={() => setPriceSort("asc")}>Low → High</button>
//               <button onClick={() => setPriceSort("desc")}>High → Low</button>
//             </div>
//           </div>
//         </div>

//         <div className={style.sortSection}>
//           <span className={style.itemCount}>
//             {filteredProducts.length} items
//           </span>

//           <div className={style.dropdown}>
//             <button className={style.sortBtn}>
//               Sort <ChevronDown />
//             </button>
//             <div className={style.dropdownMenu}>
//               <button onClick={() => setSortType("name")}>Name</button>
//               <button onClick={() => setSortType("rating")}>Rating</button>
//               <button onClick={() => setSortType("")}>Default</button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Product grid */}
//       <div className={style.grid}>
//         {filteredProducts.map((product) => (
//           <div key={product.id} className={style.card}>
//             <img
//               src={product.thumbnail}
//               alt={product.title}
//               className={style.image}
//             />
//             <h3 className={style.productTitle}>{product.title}</h3>
//             <p className={style.price}>${product.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Catalog;

import React, { useEffect, useState } from "react";
import style from "./Catalog.module.css";

const ChevronDown = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const GridIcon = ({ active }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill={active ? "#000" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const ListIcon = ({ active }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill={active ? "#000" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <circle cx="4" cy="6" r="1"></circle>
    <circle cx="4" cy="12" r="1"></circle>
    <circle cx="4" cy="18" r="1"></circle>
  </svg>
);

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState("all");
  const [priceSort, setPriceSort] = useState("");
  const [view, setView] = useState("grid"); // grid or list

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=9");
        const data = await res.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let updated = [...products];

    if (availability === "inStock") {
      updated = updated.filter((p) => p.stock > 0);
    } else if (availability === "outOfStock") {
      updated = updated.filter((p) => p.stock === 0);
    }

    if (priceSort === "asc") {
      updated.sort((a, b) => a.price - b.price);
    } else if (priceSort === "desc") {
      updated.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updated);
  }, [availability, priceSort, products]);

  if (loading) return <div className={style.loading}>Loading...</div>;

  return (
    <div className={style.catalogWrapper}>
      <h1 className={style.title}>Products</h1>

      <div className={style.filterBar}>
        <div className={style.filters}>
          <div className={style.dropdown}>
            <button className={style.filterBtn}>
              Availability <ChevronDown />
            </button>
            <div className={style.dropdownMenu}>
              <button onClick={() => setAvailability("all")}>All</button>
              <button onClick={() => setAvailability("inStock")}>
                In Stock
              </button>
              <button onClick={() => setAvailability("outOfStock")}>
                Out of Stock
              </button>
            </div>
          </div>

          <div className={style.dropdown}>
            <button className={style.filterBtn}>
              Price <ChevronDown />
            </button>
            <div className={style.dropdownMenu}>
              <button onClick={() => setPriceSort("asc")}>Low → High</button>
              <button onClick={() => setPriceSort("desc")}>High → Low</button>
            </div>
          </div>
        </div>

        <div className={style.sortSection}>
          <span className={style.itemCount}>
            {filteredProducts.length} items
          </span>
          <button className={style.sortBtn}>
            Sort <ChevronDown />
          </button>

          <button
            className={`${style.iconBtn} ${
              view === "grid" ? style.activeIcon : ""
            }`}
            onClick={() => setView("grid")}
          >
            <GridIcon active={view === "grid"} />
          </button>
          <button
            className={`${style.iconBtn} ${
              view === "list" ? style.activeIcon : ""
            }`}
            onClick={() => setView("list")}
          >
            <ListIcon active={view === "list"} />
          </button>
        </div>
      </div>

      <div className={view === "grid" ? style.grid : style.list}>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={view === "grid" ? style.card : style.listCard}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className={style.image}
            />
            <div className={style.cardDetails}>
              <h3 className={style.productTitle}>{product.title}</h3>
              <p className={style.price}>Rs. {product.price}.00</p>
              {view === "list" && (
                <p className={style.desc}>{product.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
