import { createContext, useContext, useState,useEffect } from "react";
import { auth,db } from "../firebase";
import { signInWithEmailAndPassword, signOut,onAuthStateChanged,createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { doc,getDoc,setDoc } from "firebase/firestore";
import Swal from "sweetalert2";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire("✅ 登入成功", "歡迎回來！", "success");
      setEmail("");
      setPassword("");
      navigate("/cart");
    } catch (err) {
      let message = "";
      switch (err.code) {
        case "auth/invalid-credential":
          message = "電子郵件/密碼有誤，請輸入正確電子郵件或密碼";
          break;
        case "auth/invalid-email":
          message = "Email 格式無效";
          break;
        case "auth/missing-password":
          message = "尚未輸入密碼，請輸入有效密碼"
          break;
        case "auth/missing-email":
          message = "尚未輸入電子郵件，請輸入有效電子郵件"
          break;
        default:
          message = "登入失敗：" + err.message;
      }
      Swal.fire("❌ 登入失敗", message, "error");
    }
  };

  const handleSignout = () => {
    // console.log("登出函式被觸發");
    // 檢查是否有登入的使用者
    if (!auth.currentUser) return;
  
    signOut(auth)
      .then(() => {
        dispatch(clearCart());
        localStorage.removeItem("cartItems");
        localStorage.removeItem("cartTotal")
        Swal.fire("✅ 登出成功", "期待您再次光臨！", "success");
        navigate("/"); // 導向登入頁面
      })
      .catch((error) => {
        console.error("登出時發生錯誤：", error);
      });
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const cartRef = doc(db, "carts", user.uid);
      const cartSnap = await getDoc(cartRef);
  
      if (!cartSnap.exists()) {
        await setDoc(cartRef, {
          items: [], // 註冊成功建立空的購物車陣列
        });
        // console.log("建立購物車 user uid:", user.uid);
      }
  
      Swal.fire("✅ 註冊成功", "歡迎加入我們的會員！", "success");
      setEmail("");
      setPassword("");
      navigate("/login");
  
    } catch (err) {
      let message = "";
      switch (err.code) {
        case "auth/email-already-in-use":
          message = "這個 Email 已經被註冊過了";
          break;
        case "auth/invalid-email":
          message = "Email 格式無效";
          break;
        case "auth/weak-password":
          message = "密碼強度太弱，請使用至少 6 個字元";
          break;
        case "auth/missing-password":
          message = "尚未輸入密碼，請輸入有效密碼"
          break;
        case "auth/missing-email":
          message = "尚未輸入電子郵件，請輸入有效電子郵件"
          break;
        default:
          message = "註冊失敗：" + err.message;
      }
      Swal.fire("❌ 註冊失敗", message, "error");
    }
  };

  const handleClearInputs = ()=>{
    setEmail("");
    setPassword("");
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);  // 更新 currentUser 的狀態
      setLoading(false);
    });
    return () => unsubscribe(); // 清除監聽
  }, []);
  return(
    <AuthContext.Provider value={{currentUser,loading,email,password,handleLogin,handleSignout,setEmail,setPassword,handleSignUp,handleClearInputs}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);