//　各テーブルごとのmain画面

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import css from '@/styles/Home.module.css';
import Popup from '../../components/popup';
import Link from 'next/link'

import { useSearchParams } from 'next/navigation'

export default function Main({ data }) {
    const router = useRouter();
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedMenuName, setSelectedMenuName] = useState('');
    const [selectedMenuID, setSelectedMenuID] = useState();

    const handlePopupToggle = (menu_name, menu_id) => {
      setPopupVisible(!isPopupVisible);
      setSelectedMenuName(menu_name);
      setSelectedMenuID(menu_id);
    };

    // urlパラメータの取得
    const searchParams = useSearchParams()
    const param = searchParams.get('table')

    return (
        <>
        <header className={css.header}>
            <h1>ドリンクメニュー</h1>
            <Link href={{ pathname: '/main_Meet', query: { table: param } }} passHref>
                <button className={css.menuchange}>お肉メニューへ</button>
            </Link>
        </header>
        <main className={css.main}>
            {Object.values(data).map((data, index) => (
                <div className={css.block_meet} onClick={() => handlePopupToggle(data.menu_name, data.menu_id)} key={index}>
                    <a>{data.menu_name}</a>
                    <br></br>
                    <div className={css.price}>{data.price}円</div>
                </div>
            ))}
            <Popup isVisible={isPopupVisible} onClose={handlePopupToggle} menu_name={selectedMenuName} menu_id={selectedMenuID} />
            
        </main>
        
        </>
    );
}


export async function getStaticProps() {
    let res = await fetch('http://localhost:3000/api/getDrinkData');

    let data = await res.json();

    return {
        props: {
            data,
        },
    };
}


