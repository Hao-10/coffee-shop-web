import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ProdType from '../components/ProdType';
import styles from '../css/productpage.module.css';
import ProdCard from '../components/ProdCard';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

function ProductPage() {
    const { id } = useParams();
    const [categoryName, setCategoryName] = useState(id || "所有商品");
    const [products, setProducts] = useState([]); 
    const [lastVisiblePerPage, setLastVisiblePerPage] = useState({});
    const [hasMoreProducts, setHasMoreProducts] = useState(true);

    const productsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);

    const fetchProducts = async (category, page) => {
        try {
            let productQuery = query(
                collection(db, "coffeeShop"),
                orderBy("type"),
                limit(productsPerPage)
            );
    
            // 如果有選擇類別，則加上分類篩選
            if (category !== "所有商品") {
                productQuery = query(productQuery, where("type", "==", category));
            }
    
            // 如果不是第一頁，使用對應頁面的起始文檔
            if (page > 1 && lastVisiblePerPage[page - 1]) {
                productQuery = query(productQuery, startAfter(lastVisiblePerPage[page - 1]));
            }
    
            const querySnapshot = await getDocs(productQuery);
            const productsArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
    
            // 更新該頁的最後一個文檔
            const updatedLastVisiblePerPage = {...lastVisiblePerPage};
            updatedLastVisiblePerPage[page] = querySnapshot.docs[querySnapshot.docs.length - 1];
            setLastVisiblePerPage(updatedLastVisiblePerPage);
    
            // 如果獲取的商品數量小於8，則表示沒有更多商品
            setHasMoreProducts(productsArray.length === productsPerPage);
    
            // 設置當前頁面的商品
            setProducts(productsArray);
    
        } catch (error) {
            console.error("獲取商品失敗：", error);
        }
    };

    useEffect(() => {
        fetchProducts(categoryName, currentPage);
    }, [categoryName, currentPage]);

    // 處理下一頁
    const handleNextPage = () => {
        if (hasMoreProducts) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    // 處理上一頁
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    // 當 `id` 改變時，更新分類和頁數
    useEffect(() => {
        if (id) {
            setCategoryName(id);
        }
        setProducts([]); // 清空現有商品資料
        setCurrentPage(1); // 重設頁數
        setLastVisiblePerPage({}); // 重置頁面文檔追蹤
    }, [id]);

    useEffect(() => {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100); // 等待 100 毫秒再滾動
      }, [currentPage]);

    return (
        <div>
            <Navbar />
            <Layout>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <ProdType/>
                </motion.div>
                <div className={styles.category_wrap}>
                    <h1 className={styles.category}>{categoryName}</h1>
                </div>
                <ProdCard 
                    currentProducts={products} 
                    handleNextPage={handleNextPage} 
                    handlePrevPage={handlePrevPage} 
                    currentPage={currentPage}
                    hasMoreProducts={hasMoreProducts}
                    category={categoryName}
                />
            </Layout>
            <Footer />
        </div>
    );
}

export default ProductPage;