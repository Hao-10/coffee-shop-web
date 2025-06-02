import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../css/productDetailPage.module.css"
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { imgPath } from "../utils/imgPath";

function ProductDetailPage() {
    const { id } = useParams(); // 獲取 category 和 id
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [counter, setCounter] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleIncrement = () => {
        if (counter < product.stockQuantity) {
            setCounter((counter) => counter + 1);
        }
    };
    const handleDecrement = () => {
        if (counter > 1) {
            setCounter(counter => counter - 1);
        }
    };

    const handleAddToCart = async (quantity,stk) => {
        if (!auth.currentUser) {
          alert("請先登入才能加入商品至購物車！");
          navigate("/login");
          return;
        }
        if(stk<=0){
          alert("該商品已完售！");
          return;
        }
        // Redux 加入購物車
        dispatch(addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          qty: quantity,
          stockQuantity: product.stockQuantity,
          img: product.img
        }));
      
        const user = auth.currentUser;
        const cartRef = doc(db, "carts", user.uid);
      
        try {
          const cartSnap = await getDoc(cartRef);
      
          if (cartSnap.exists()) {
            const existingItems = cartSnap.data().items || [];
            const index = existingItems.findIndex(item => item.name === product.name);
            let updatedItems;
            if (index !== -1) {
              const existingItem = existingItems[index];
              const newQty = existingItem.qty + quantity;
              const newTotal = newQty * product.price;
      
              existingItems[index] = {
                ...existingItem,
                qty: newQty,
                total: newTotal
              };
              updatedItems = existingItems;
            } else {
              // 加入新商品
              const newItem = {
                id: product.id,
                name: product.name,
                img: product.img,
                price: product.price,
                qty: quantity,
                total: product.price * quantity
              };
              updatedItems = [...existingItems, newItem];
            }
            await updateDoc(cartRef, { items: updatedItems });
            alert("已加入購物車！");
            navigate("/cart");
          } else {
            console.error("找不到購物車文件！");
          }
        } catch (error) {
          console.error("儲存到 Firestore 失敗：", error);
          alert("加入購物車時發生錯誤！");
        }
      };


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productRef = doc(db, "coffeeShop", id);
                const productSnap = await getDoc(productRef);
                if (productSnap.exists()) {
                    setProduct({ id: productSnap.id, ...productSnap.data() });
                } else {
                    console.log("找不到該商品");
                }
            } catch (error) {
                console.error("獲取商品詳情失敗：", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (loading) return <p>載入中...</p>;
    if (!product) return <p>商品不存在</p>;

    return (
        <>
            <Navbar />
            <div className={styles.wrap} style={{ padding: '130px 0px' }}>
                <div className={styles.prodDetail_wrap}>
                  <div className={styles.product_img_wrap}>
                  <img src={imgPath(product.img)} alt={product.name} />
                  </div>
                  <div className={styles.prodDetail}>
                      <h1>商品類別：{product.type}</h1>
                      <h2>{product.name}</h2>
                      <p>{product.description}</p>
                      <h2>NT${product.price}</h2>
                      <p>(商品庫存) 剩餘:{product.stockQuantity}</p>
                      <div className={styles.counter_wrap}>
                          <p>數 量</p>
                          <button onClick={handleDecrement}>-</button>
                          <p>{counter}</p>
                          <button onClick={handleIncrement}>+</button>
                      </div>
                      <button className={product.stockQuantity===0?styles.soldOut:styles.addToCartBtn} disabled={product.stockQuantity === 0} onClick={() => handleAddToCart(counter,product.stockQuantity)}>{product.stockQuantity<=0?"已完售":"加入購物車"}</button>
                  </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProductDetailPage;