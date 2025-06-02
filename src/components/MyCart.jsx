import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, clearCart, removeFromCart, setProducts } from "../redux/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import styles from "../css/cartpage.module.css";
import Swal from "sweetalert2";
import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useAuth } from "../store/AuthContext";
// import { setProducts } from "../redux/cartSlice";
import { useState } from "react";
import { imgPath } from "../utils/imgPath";

function MyCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const { currentUser } = useAuth();
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  // console.log("目前購物車內容:", cartItems);


  const handleIncrement = async(item) => {
    const docRef = doc(db, "coffeeShop", item.id);
    const docSnap = await getDoc(docRef);
    const matchedProduct = docSnap.data(); // 獲取該商品資料
    if (item.qty < matchedProduct.stockQuantity) {
      dispatch(updateQuantity({ id: item.id, quantity: item.qty + 1, stockQuantity: matchedProduct.stockQuantity }));
    } else {
      alert("庫存未達到您購買的數量！");
    }
  };

  const handleDecrement = async(item) => {
    const docRef = doc(db, "coffeeShop", item.id);
    const docSnap = await getDoc(docRef);
    const matchedProduct = docSnap.data();
    if (item.qty > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.qty - 1, stockQuantity: matchedProduct.stockQuantity }));
    } else {
      alert("商品購買數量不可小於 1 ");
    }
  };

  const handleRemoveItem = (id) => {
    Swal.fire({
      title: "移除該品項？",
      text: "你確定要移除該品項嗎？這個動作無法復原。",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "是的，移除",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart(id));
      }
    });
  };

  const handleClearCart = () => {
    Swal.fire({
      title: "清除購物車？",
      text: "你確定要清空購物車嗎？這個動作無法復原。",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "是的，清除",
      cancelButtonText: "取消",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // 清空 Redux 購物車
          dispatch(clearCart());
          // 同步清空 Firebase 購物車資料
          if (currentUser?.uid) {
            await setDoc(doc(db, "carts", currentUser.uid), {
              items: [], // 清空購物車
            });
          }
        } catch (error) {
          console.error("清除購物車資料時出現錯誤：", error);
        }
      }
    });
  };

  const handleCheckOutCart = async () => {
    const result = await Swal.fire({
      title: "🛒 確認要結帳嗎？",
      text: "結帳後商品庫存將會更新，請確認購買內容！",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "✅ 結帳",
      cancelButtonText: "❌ 取消",
    });
  
    // 如果使用者點擊「取消」，就中止結帳流程
    if (!result.isConfirmed) {
      return;
    }
    try {
      for (const item of cartItems) {
        // console.log(item.id);
        const productRef = doc(db, "coffeeShop", item.id);
        const productSnap = await getDoc(productRef);
        const productData = productSnap.data();
        // console.log(productData.stockQuantity);
        // console.log(item.qty);
        const updatedStock = Number(productData.stockQuantity) - Number(item.qty);
        // console.log(updatedStock);
        await updateDoc(productRef, {
          stockQuantity: updatedStock,
        });
      }
  
      // 清空購物車 (Redux + Firebase)
      dispatch(clearCart());
      await setDoc(doc(db, "carts", currentUser.uid), {
        items: [],
      });
  
      Swal.fire("✅ 結帳成功", "感謝您的購買！", "success");
  
    } catch (error) {
      console.error('結帳失敗錯誤細節:', error);
      Swal.fire("❌ 結帳失敗", error.message, "error");
    }
  };

  useEffect(() => {
    if (!currentUser || !currentUser.uid) {
      console.log('User not logged in or missing UID');
      return;
    }
    const fetchCartData = async () => {
      try {
        const docRef = doc(db, "carts", currentUser.uid);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const data = docSnap.data();
          const items = data.items || [];
          dispatch(setProducts(items));
        } else {
          console.log("找不到該用戶的購物車資料。");
        }
      } catch (error) {
        console.error("讀取購物車資料失敗：", error);
      } finally {
        setIsCartLoaded(true); // 資料讀取完成
      }
    };
    fetchCartData();
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (!currentUser?.uid || !isCartLoaded) return; // 確保資料已載入後才執行
    const updateCartInFirestore = async () => {
      try {
        await setDoc(doc(db, "carts", currentUser.uid), {
          items: cartItems,
        });
      } catch (error) {
        console.error("更新購物車資料時出現錯誤：", error);
      }
    };
    updateCartInFirestore();
  }, [cartItems, currentUser, isCartLoaded]);

  return (
    <div className={styles.wrap} >
      <h2 style={{ margin: "30px 0px" }}>我的購物車</h2>
      <table>
        <thead>
          <tr>
            <th>品名</th>
            <th>售價</th>
            <th>數量</th>
            <th>合計</th>
            <th>操作訂單</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                <p>目前購物車是空的。</p>
              </td>
            </tr>
          ) : (
            cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className={styles.prodname}>
                    <img src={imgPath(item.img)} alt={item.name} />
                    <p>{item.name}</p>
                  </div>
                </td>
                <td>NT${item.price}</td>
                <td className={styles.quantity_td}>
                  <div className={styles.quantity_wrap}>
                    <FontAwesomeIcon
                      icon={faMinus}
                      onClick={() => handleDecrement(item)}
                      className={styles.icon}
                    />
                    <p>{item.qty}</p>
                    <FontAwesomeIcon
                      icon={faPlus}
                      onClick={() => handleIncrement(item)}
                      className={styles.icon}
                    />
                  </div>
                </td>
                <td>NT${item.price * item.qty}</td>
                <td>
                  <button
                    className={styles.delete_btn}
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    移除
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <button className={styles.clear_btn} onClick={handleClearCart}>
                清空購物車
              </button>
            </td>
            <td colSpan="2"></td>
            <td>
              <h3>總金額: NT${totalAmount}</h3>
            </td>
            <td>
              <button className={styles.checkout_btn} disabled={cartItems.length === 0} onClick={handleCheckOutCart}>結帳</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default MyCart;