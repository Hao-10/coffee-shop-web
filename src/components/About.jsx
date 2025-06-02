import styles from "../css/about.module.css";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { imgPath } from "../utils/imgPath";

function About() {
    const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: true, threshold: 0.2 });
    const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: true, threshold: 0.2 });
    const { ref: ref3, inView: inView3 } = useInView({ triggerOnce: true, threshold: 0.2 });
    const { ref: ref4, inView: inView4 } = useInView({ triggerOnce: true, threshold: 0.2 });

    const cardContainerVariants = {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.3, // 每張卡片間隔 0.3 秒進場
          },
        },
      };
      
      // 單張卡片的動畫變化
      const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: 'easeOut'
          }
        }
      };

    // 成員圖片動畫（從左邊滑入+逆時針轉一圈）
    const memberImageVariants = {
        hidden: {
            opacity: 0,
            x: -200,
            rotate: -90
        },
        visible: {
            opacity: 1,
            x: 0,
            rotate: 0,
            transition: {
                duration: 1.3,
                ease: 'easeOut'
            }
        }
    };

    // 文字淡入動畫
    const memberTextVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 1.5,
                ease: 'easeOut'
            }
        }
    };

    const memberContainerVariants = {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.3
          }
        }
      };

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

    return (
        <div>
            <motion.div
                ref={ref1}
                className={styles.title}
            >
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView1 ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.3 }} // 延遲 1 秒
                >
                    關於我們
                </motion.h2>
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView1 ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.3 }} // 更晚一點出現
                >
                    About Us
                </motion.h3>
            </motion.div>

            <motion.div
                ref={ref2}
                initial="hidden"
                animate={inView2 ? "visible" : "hidden"}
                variants={cardContainerVariants}
                className={styles.processSection}
                >
                <h2>咖啡製作的堅持</h2>
                <p className={styles.subTitle}>從豆子到杯中，每一步都是我們的堅持</p>
                <motion.div className={styles.cardContainer}>
                    <motion.div className={styles.card} variants={cardVariants}>
                    <img src={imgPath("about-coffee5.jpg")} alt="挑選咖啡豆" />
                    <h3>咖啡豆的挑選</h3>
                    <p>與南投與阿里山小農合作，親自杯測篩選最適風味的高品質豆。</p>
                    </motion.div>
                    <motion.div className={styles.card} variants={cardVariants}>
                    <img src={imgPath("about-coffee9.jpg")} alt="手工烘焙" />
                    <h3>手工烘焙工藝</h3>
                    <p>以小批量中淺焙，保留豆子的花果香與乾淨口感。</p>
                    </motion.div>
                    <motion.div className={styles.card} variants={cardVariants}>
                    <img src={imgPath("about-coffee8.jpg")} alt="手作咖啡與甜點" />
                    <h3>飲品與甜點</h3>
                    <p>堅持每日手作現做，傳遞細膩溫度與自然風味。</p>
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.div
                ref={ref3}
                initial="hidden"
                animate={inView3 ? "visible" : "hidden"}
                className={styles.member}
                variants={memberContainerVariants}
                >
                <h2>團隊成員</h2>
                <motion.div className={styles.member_wrap} variants={memberContainerVariants}>
                    <motion.div className={styles.member_card} variants={cardVariants}>
                    <motion.div variants={memberImageVariants}>
                        <img  src={imgPath("member1.jpg")} alt="布魯斯" />
                    </motion.div>
                    <motion.p variants={memberTextVariants}>布魯斯</motion.p>
                    <motion.p variants={memberTextVariants}>店長 Cafe Manager</motion.p>
                    </motion.div>
                    <motion.div className={styles.member_card} variants={cardVariants}>
                    <motion.div variants={memberImageVariants}>
                        <img  src={imgPath("member3.jpg")} alt="海莉" />
                    </motion.div>
                    <motion.p variants={memberTextVariants}>海莉</motion.p>
                    <motion.p variants={memberTextVariants}>總廚 Head Barista</motion.p>
                    </motion.div>
                    <motion.div className={styles.member_card} variants={cardVariants}>
                    <motion.div variants={memberImageVariants}>
                        <img src={imgPath("member2.jpg")}  alt="詹姆斯" />
                    </motion.div>
                    <motion.p variants={memberTextVariants}>詹姆斯</motion.p>
                    <motion.p variants={memberTextVariants}>營運總監 Operations Director</motion.p>
                    </motion.div>
                </motion.div>
                </motion.div>

            <motion.div
                ref={ref4}
                initial={{ opacity: 0, y: 30 }}
                animate={inView4 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={styles.missionSection}
                >
                <div className={styles.missionText}>
                    <motion.div
                    className={styles.vision_belief}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView4 ? "visible" : "hidden"}
                    >
                    <motion.h2 variants={slideLeftItem}>我們的信念</motion.h2>
                    <motion.p variants={slideLeftItem}>
                        我們相信，一杯好咖啡能連結人與人之間的情感，也能成為每個人日常生活中的小小慰藉。
                        我們希望透過每一次的用心製作，為這座城市注入更多溫度與療癒。
                    </motion.p>

                    <motion.h3 variants={slideLeftItem}>我們的願景</motion.h3>
                    <motion.p variants={slideLeftItem}>
                        未來，我們將持續與在地小農合作，推廣永續、友善環境的咖啡文化，
                        也計畫推出線上咖啡課程與體驗盒，讓更多人能在生活中感受手沖的美好。
                    </motion.p>
                    </motion.div>

                    <div className={styles.missionImage}>
                    <img src={imgPath("about-mission.jpg")} alt="mission" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default About;