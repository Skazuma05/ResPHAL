import React, { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css'
import Popup from '../components/popup';

import { useSearchParams } from 'next/navigation'



export default function Main({ data }) {
    const [isPopupVisible, setPopupVisible] = useState(false);

    const handlePopupToggle = () => {
      setPopupVisible(!isPopupVisible);
    };

    // urlパラメータの取得
    const searchParams = useSearchParams()
    const param = searchParams.get('table')

    return (
        <main className={styles.main}>
            <h1>Data from MySQL Database</h1>
            {data.map((data, index) => (
                <div className={styles.block} onClick={handlePopupToggle} key={index}>
                    <a>{data.sales_id}</a>
                    <br></br>
                    <a className={styles.param}>{data.date}</a>
                </div>
            ))}
            <a>{param}</a>
            <Popup isVisible={isPopupVisible} onClose={handlePopupToggle} message = "aiueo"/>
        </main>
    );
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/getTableID');
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}


