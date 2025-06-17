// 上方導覽列組件
import { Link, NavLink } from "react-router-dom";
import styles from "../css/navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../store/AuthContext";
import { auth } from "../firebase";
import { imgPath } from "../utils/imgPath";


function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [navToggle,setNavToggle] =useState(false); //導覽列開關判斷
    const closeTimer = useRef(null);
    const {handleSignout}= useAuth();

    const handleMouseEnter = () => {
        clearTimeout(closeTimer.current);
        setIsOpen(true);
      };
      
      const handleMouseLeave = () => {
        closeTimer.current = setTimeout(() => {
          setIsOpen(false);
        }, 150);
      };

      useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth > 768) {
            setNavToggle(true);  // 電腦版顯示選單
          } else {
            setNavToggle(false); // 行動版預設關閉選單
          }
        };
      
        handleResize(); // 初始執行一次
      
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
      
    return(
        <>
            <nav className={styles.nav}>

                <div className={styles.imgwrap}>
                    <Link to="/">
                        <img src={imgPath("logo1.png")} className={styles.logo} alt='logo'/>
                    </Link>
                </div>

                <div className={styles.hamburger_btn} onClick={()=> setNavToggle(!navToggle)}><button>{navToggle ? <FontAwesomeIcon className={styles.hamburger_icon} icon={faXmark} /> :<FontAwesomeIcon className={styles.hamburger_icon} icon={faBars} />}</button></div>

                <ul className={navToggle ? styles.nav_ul : styles.nav_ul_off}>
                    <li><NavLink className={styles.navlink} to="/">首頁</NavLink></li>
                    <li><NavLink className={styles.navlink} to="/product/所有商品" >商品</NavLink></li>
                    <li><NavLink className={styles.navlink} to="/cart">購物車</NavLink></li>
                    <li><NavLink className={styles.navlink} to="/about">關於我們</NavLink></li>
                    <li><NavLink className={styles.navlink} to="/contact">聯絡我們</NavLink></li>
                    {auth.currentUser ? (
                    <li className={styles.signout_li}><button onClick={handleSignout} >登出</button></li>
                    ) : (
                    <li><NavLink className={styles.navlink} to="/login">登入</NavLink></li>
                    )}
                </ul>
                
                <div className={styles.iconwrap}>
                    <FontAwesomeIcon className={styles.usericon} icon={faUser} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
                    {isOpen && (
                        <div className={styles.feature} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
                            {auth.currentUser?(<button className={styles.signout} onClick={handleSignout}>登出</button>):(<Link to="/login">登入</Link>)}
                        </div>
                    )}
                </div>
            </nav>
        </>
    )
}
export default Navbar;