import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';
import { Link } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import styles from "../css/loginpage.module.css"
import { imgPath } from '../utils/imgPath';

export default function LoginPage() {
  const {handleLogin, setEmail,setPassword,email,password,handleClearInputs} =useAuth();

  return (
    <div>
      <Navbar/>
      <div className={styles.wrap}>
        <div className={styles.login_wrap}>
          <img src={imgPath("logo1.png")} alt="logo" />
          <h2 className={styles.title}>登入</h2>
          <div>
            <p>電子郵件</p>
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <p>密碼</p>
            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className={styles.authButtons}>
            <Link to="/signup" style={{textDecoration:"none"}}><button className={styles.signup}>註冊</button></Link>
            <button onClick={handleLogin} className={styles.login}>登入</button>
          </div>
          <div>
            <p>Don’t have an account? <Link to="/signup" className={styles.formPrompt} onClick={handleClearInputs}>Sign up now.</Link></p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}