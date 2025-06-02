import { createSlice } from "@reduxjs/toolkit";
// 🔹 從 localStorage 讀取購物車
const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
const savedTotal = JSON.parse(localStorage.getItem("cartTotal")) || 0;

const initialState = {
  items: savedCart,
  totalAmount: savedTotal,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.qty,
        0
      );
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("cartTotal", JSON.stringify(state.totalAmount));
    },
    addToCart: (state, action) => {
      const newItem = action.payload;  //商品詳細資料
      const existingItem = state.items.find(item => item.id === newItem.id); //找出對應商品

      const stockQuantity = newItem.stockQuantity; //商品庫存
      if (existingItem) {  //如果有找到該商品
        
        const newQuantity = existingItem.quantity + newItem.qty;  //設定一個變數紀錄 該購物車的商品數量+上使用者加入的數量
        if (newQuantity <= stockQuantity) { //如果庫存大於等於這個新的購物的商品數量
          existingItem.quantity = newQuantity; //就讓購物車的數量等於這個新的數量 代表商品數量並沒有超過庫存
        } else {
          existingItem.quantity = stockQuantity; //那如果超過了就把這個數量設定在庫存的最大數量 讓使用這沒辦法購買超過
        }
      } else {
        state.items.push(newItem); //否則如果購物車沒有該商品把新的商品資料push進到購物車裡
      }

      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.qty,
        0
      );
      // console.log(state.totalAmount);
      // ✅ 存進 localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("cartTotal", JSON.stringify(state.totalAmount));
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);

      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("cartTotal", JSON.stringify(state.totalAmount));
    },
    updateQuantity: (state, action) => {                           //total需要改 傳入的有id跟數量qty
      const { id, quantity, stockQuantity  } = action.payload;
      const item = state.items.find(item => item.id === id);  //比對購物車跟傳進來的id有沒有一致
      if (item) {                   //如果有比對到代表購物車有該筆商品資料
        item.qty = Math.min(quantity, stockQuantity);      //購物車的這個id的數量等於使用者購買的數量和庫存數量中的最小值 代表只要不超過庫存數量都會是使用者購買的數量 就算到了庫存數量 也只會是取庫存數量的值
      }
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.qty,
        0
      );
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("cartTotal", JSON.stringify(state.totalAmount));
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;

      localStorage.removeItem("cartItems");
      localStorage.removeItem("cartTotal");
      // console.log(state.totalAmount);
      // console.log(state.items);
    },
  },
});

export const {
  setProducts,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;