import React from 'react';
import styles from "../css/layout.module.css";

function Layout({ children }) {
  return (
    <div>
      <main className={styles.pageWrapper}>
        {children}
      </main>
    </div>
  );
}

export default Layout;