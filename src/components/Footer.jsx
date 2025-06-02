// 頁尾組件
import { Link } from "react-router-dom";
import styles from "../css/footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee,faEnvelope,faPhone,faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faFacebook,faInstagram,faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLocation } from "react-router-dom";

function Footer() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
    const location = useLocation();
    const path = location.pathname
    const noAnimationPages = ["/login", "/signup"];
    const isAnimated = !noAnimationPages.includes(path);
    return(
        <motion.footer ref={ref} initial={{ opacity: 0, y: 50 }} animate={isAnimated ? inView ? { opacity: 1, y: 0 } : {} :{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className={styles.footer}>
            <div className={styles.footer_wrap}>
                <div className={styles.wrap}>
                    <div className={styles.top_icon}>
                            <p>MorningBrew<FontAwesomeIcon icon={faCoffee} style={{fontSize: "30px"}}/></p>
                    </div>
                    <div className={styles.ul_wrap}>
                        <ul className={styles.footer_ul}>
                            <li><Link className={styles.link} to="/">首頁</Link></li>
                            <li><Link className={styles.link} to="/product/所有商品">商品</Link></li>
                            <li><Link className={styles.link} to="/cart">購物車</Link></li>
                            <li><Link className={styles.link} to="/about">關於我們</Link></li>
                            <li><Link className={styles.link} to="/contact">聯絡我們</Link></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.footer_menu}>
                    <div className={styles.contactInfo}>
                        <p><FontAwesomeIcon icon={faEnvelope} className={styles.icon} />Email: morning@example.com</p>
                        <p><FontAwesomeIcon icon={faLocationDot} className={styles.icon} /> 地址: 台中市沙鹿區xx路xx號</p>
                        <p><FontAwesomeIcon icon={faPhone} className={styles.icon} />電話: (02) 1234-5678</p>
                    </div>
                    <div className={styles.footerComm}>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} className={styles.icon} />FaceBook</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} className={styles.icon} />Instagram</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faXTwitter} className={styles.icon} />Twitter</a>
                    </div>
                </div>
                <div className={styles.footer_logo}>
                        <img src={'/img/logo1.png'} alt='logo' style={{ width: "130px", height: "100px" ,margin: "20px 80px 0px 0px"}}/>
                </div>
            </div>
            <div className={styles.copyright}>
                    <p >© 2025 Morning Brew. All Rights Reserved.</p>
            </div>
        </motion.footer>
    )
}

export default Footer;