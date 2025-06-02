// 首頁-品牌創立組件
import { useState,useEffect } from "react";
import styles from "../css/brand.module.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function Brand() {
    const [brandcreation,setBrandcreation] = useState(null);
    const [brandpt,setBrandpt] = useState(null);
    const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: true, threshold: 0.2 });
    const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: true, threshold: 0.2 });
    useEffect(() => {
    const fetchBrandData = async () => {
        try {
        const brandcreationRef = doc(db, "brand", "brandcreation");
        const brandcreationSnap = await getDoc(brandcreationRef);

        if (brandcreationSnap.exists()) {
            setBrandcreation({ id: brandcreationSnap.id, ...brandcreationSnap.data() });
        } else {
            console.log("找不到 brandcreation 文件");
        }

        const brandptRef = doc(db, "brand", "brandpt");
        const brandptSnap = await getDoc(brandptRef);

        if (brandptSnap.exists()) {
            setBrandpt({ id: brandptSnap.id, ...brandptSnap.data() });
        } else {
            console.log("找不到 brandpt 文件");
        }

        } catch (error) {
        console.error("獲取品牌資料失敗：", error);
        }
    };

    fetchBrandData();
    },[]);

    if (!brandcreation || !brandpt) {
        return <div>載入中...</div>;
    }

    return(
        <div className={styles.brand}>
            <motion.div ref={ref1} initial={{ opacity: 0, y: 50 }} animate={inView1 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className={styles.brandcreation}>
                <img src={brandcreation.img} alt="" className={styles.brandimage} />
                <div className={styles.h1_p}>
                    <h1>{brandcreation.title}</h1>
                    <p>{brandcreation.firstContent}</p>
                    <p>{brandcreation.secondContent}</p>
                </div>
            </motion.div>
            <motion.div ref={ref2} initial={{ opacity: 0, y: 50 }} animate={inView2 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className={styles.brandps}>
                <div className={styles.h1_p}>
                    <h1>{brandpt.title}</h1>
                    <p>{brandpt.firstContent}</p>
                    <p>{brandpt.secondContent}</p>
                </div>
                <img src={brandpt.img} alt="" className={styles.brandimage} />
            </motion.div>
        </div>
    )
}
export default Brand;