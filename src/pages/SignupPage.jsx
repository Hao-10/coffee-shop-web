import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../css/signuppage.module.css"
import { Link } from "react-router-dom";
import { useAuth } from "../store/AuthContext";


export default function SignupPage() {
  const {handleSignUp,handleClearInputs,setEmail,setPassword,email,password} =useAuth();
  return (
    <div>
    <Navbar/>
    <div className={styles.wrap} style={{ paddingTop: '150px' }}>
      <div className={styles.signup_wrap}>
        <img src="../../public/img/logo1.png" alt="logo" />
        <h2 className={styles.title}>註冊</h2>
        <div>
          <p>電子郵件</p>
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <p>密碼</p>
          <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className={styles.authButtons}>
          <button onClick={handleSignUp} className={styles.signup}>註冊</button>
        </div>
        <div>
          <p>Go back to the Login page? <Link to="/login" className={styles.formPrompt} onClick={handleClearInputs}>Back to Login.</Link></p>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
  );
}