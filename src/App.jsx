import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pageS/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from "./store/AuthContext";
import AboutPage from "./pages/AboutPage";

function App() {

  return (
      <Router basename="/coffee-shop-web">
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id?" element={<ProductPage />} />
            <Route path="/product/:category/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
            <Route path="/contact" element={<ContactPage/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </AuthProvider>
      </Router>
  );
}

export default App;