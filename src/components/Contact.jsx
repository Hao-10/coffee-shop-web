import styles from "../css/contact.module.css";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';

function Contact(){
    const { ref: ref1, inView: inview1 } = useInView({ triggerOnce: true, threshold: 0.2 });
    const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: true, threshold: 0.2 });
    const { ref: ref3, inView: inView3 } = useInView({ triggerOnce: true, threshold: 0.2 });
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: (i = 1) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: "easeOut",
          },
        }),
      };
    return(
        <div className={styles.contact_wrap}>
            <motion.div ref={ref1} className={styles.title}>
                <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inview1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                >
                聯絡我們
                </motion.h2>
                <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={inview1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                >
                Contact Us
                </motion.h3>
            </motion.div>
            <motion.div ref={ref2} initial={{ opacity: 0, y: 50 }} animate={inView2 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className={styles.store_info}>
                <div className={styles.firstmap}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29106.50508282782!2d120.56927332195207!3d24.23082439317303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3469144c17880d29%3A0x880cd236b6a09f31!2zNDMz5Y-w5Lit5biC5rKZ6bm_5Y2A!5e0!3m2!1szh-TW!2stw!4v1747723831921!5m2!1szh-TW!2stw" 
                     style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className={styles.topaddress_wrap}>
                    <div className={styles.firstaddress}>
                        <h1>沙鹿區</h1>
                        <p>Morning Brew沙鹿店</p>
                        <p>📍台中市沙鹿區某某街500號</p>
                        <p>Shalu District, Taichung City 433</p>
                        <p>✉️morning@example.com \ ☎️ 02-1234-5678</p>
                    </div>
                    <div className={styles.firsthours}>
                        <p>營業時間</p>
                        <div className={styles.week}>
                            <p>星期一 　7am – 8pm</p>
                            <p>星期二 　7am – 8pm</p>
                        </div>
                        <div className={styles.week}>
                            <p>星期三 　7am – 8pm</p>
                            <p>星期四 　7am – 8pm</p>
                        </div>
                        <div className={styles.week}>
                            <p>星期五 　7am – 8pm</p>
                            <p>星期六 　9am – 8pm</p>
                        </div>
                        <div className={styles.week}>
                            <p>星期日 　9am – 6pm</p>
                        </div>
                    </div>
                </div>
            </motion.div>
            <motion.div ref={ref3} initial={{ opacity: 0, y: 50 }} animate={inView3 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className={styles.store_info}>
                <div className={styles.bottomaddress_wrap}>
                    <div className={styles.address}>
                        <h1>北屯區</h1>
                        <p>Morning Brew北屯店</p>
                        <p>📍台中市北屯區某某街666號</p>
                        <p>Beitun District, Taichung City 406</p>
                        <p>✉️morning@example.com \ ☎️ 02-2345-6789</p>
                    </div>
                    <div className={styles.hours}>
                        <p>營業時間</p>
                        <div className={styles.week}>
                            <p>星期一 　7am – 8pm</p>
                            <p>星期二 　7am – 8pm</p>
                        </div>
                        <div className={styles.week}>
                            <p>星期三 　7am – 8pm</p>
                            <p>星期四 　7am – 8pm</p>
                        </div>
                        <div className={styles.week}>
                            <p>星期五 　7am – 8pm</p>
                            <p>星期六 　9am – 8pm</p>
                        </div>
                        <div className={styles.week}>
                            <p>星期日 　9am – 6pm</p>
                        </div>
                    </div>
                </div>
                <div className={styles.map}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58232.549061739875!2d120.6888072478467!3d24.188059437273402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34691836c5da5a35%3A0x6df17553336f187f!2zNDA25Y-w5Lit5biC5YyX5bGv5Y2A!5e0!3m2!1szh-TW!2stw!4v1747886658765!5m2!1szh-TW!2stw" 
                 style={{border:0}} allowFullScreen loading="lazy"  referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </motion.div>
        </div>
    )
}
export default Contact;