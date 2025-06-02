// 上方商品類別組件
import { Link } from "react-router-dom";
import styles from "../css/productpage.module.css";

function ProdType({}) {


    return(
        <div className={styles.prodtype}>
            <ul className={styles.type_ul}>
                <li><Link to="/product/所有商品">所有商品</Link></li>
                <li><Link to="/product/咖啡">咖啡</Link></li>
                <li><Link to="/product/甜點">甜點</Link></li>
                <li><Link to="/product/鹹食">鹹食</Link></li>
            </ul>
        </div>
    )
}

export default ProdType;