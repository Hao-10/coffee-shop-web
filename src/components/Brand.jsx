// 首頁-品牌創立組件
import { useState,useEffect } from "react";
import styles from "../css/brand.module.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { imgPath } from "../utils/imgPath";

function Brand() {
    const [brandcreation,setBrandcreation] = useState(null);
    const [brandpt,setBrandpt] = useState(null);
    const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: true, threshold: 0.2 });
    const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: true, threshold: 0.2 });

    const containerVariants = {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.3, // 每個 child 間隔 0.3 秒
          },
        },
      };

    const slideLeftItem = {
        hidden: { opacity: 0, x: -100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.8,
            ease: 'easeOut',
          },
        },
      };

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
                <img src={imgPath(brandcreation.img)} alt="" className={styles.brandimage} />
                <motion.div variants={containerVariants} initial="hidden" animate={inView1 ? "visible" : "hidden"} className={styles.h1_p}>
                    <motion.h1 variants={slideLeftItem}>{brandcreation.title}</motion.h1>
                    <motion.p variants={slideLeftItem}>{brandcreation.firstContent}</motion.p>
                    <motion.p variants={slideLeftItem}>{brandcreation.secondContent}</motion.p>
                </motion.div>
            </motion.div>
            <motion.div ref={ref2} initial={{ opacity: 0, y: 50 }} animate={inView2 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className={styles.brandps}>
                <motion.div variants={containerVariants} initial="hidden" animate={inView2 ? "visible" : "hidden"} className={styles.h1_p}>
                    <motion.h1 variants={slideLeftItem}>{brandpt.title}</motion.h1>
                    <motion.p variants={slideLeftItem}>{brandpt.firstContent}</motion.p>
                    <motion.p variants={slideLeftItem}>{brandpt.secondContent}</motion.p>
                </motion.div>
                <img src={imgPath(brandpt.img)} alt="" className={styles.brandimage} />
            </motion.div>
        </div>
    )
}
export default Brand;