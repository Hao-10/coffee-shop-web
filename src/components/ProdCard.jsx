// 商品卡片組件
import { Link } from "react-router-dom";
import styles from "../css/productpage.module.css"
function ProdCard({currentProducts, handleNextPage, handlePrevPage, currentPage, hasMoreProducts,category}) {
    return(
        <div className={styles.prodcard_wrap}>
            <div className={styles.allcard_wrap}>
                {currentProducts.map((product)=>(
                    <div className={styles.cardboder} key={product.id}>
                        <img src={product.img} alt='product' style={{ width: "100%", height: "250px" ,margin: "20px 80px 0px 0px",objectFit: "cover"}}/>
                        <div className={styles.product_info}>
                            <h3>{product.name}</h3>
                            <h2>NT${product.price}</h2>
                        </div>
                        <div className={styles.card_overlay}></div>
                        <Link to={`/product/${category}/${product.id}`} className={styles.product_link}>
                            <div className={styles.add_to_cart}>
                                <button>查看商品詳情</button>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className={styles.pagination}>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    上一頁
                </button>
                <span>第 {currentPage} 頁 {hasMoreProducts}</span>
                <button onClick={handleNextPage} disabled={!hasMoreProducts}>
                    下一頁
                </button>
            </div>
        </div>
    )
}

export default ProdCard;