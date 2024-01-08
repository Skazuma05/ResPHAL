//　各テーブルごとのmain画面

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
        <>
        <header className={styles.header}>
            <h1>メイン画面</h1>
            <div className={styles.tid}>{param}</div>
        </header>
        <main className={styles.main}>
            {data.map((data, index) => (
                <div className={styles.block_meet} onClick={handlePopupToggle} key={index}>
                    <a>{data.menu_name}</a>
                    <br></br>
                    <div className={styles.price}>{data.price}円</div>
                </div>
            ))}
            <Popup isVisible={isPopupVisible} onClose={handlePopupToggle} />
        </main>
        </>
    );
}

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/getMeetData');
    const data = await res.json();

    return {
    props: {
        data,
    },
    };
}


