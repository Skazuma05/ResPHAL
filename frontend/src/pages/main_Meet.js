//　各テーブルごとのmain画面

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import css from '@/styles/Home.module.css';
import Link from 'next/link'

import Popup from '../../components/popup';

import { useSearchParams } from 'next/navigation'

let flag = 0;

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
            <h1>お肉メニュー</h1>
            <Link href={{ pathname: '/main_Drink', query: { table: param } }} passHref>
                <button className=''>ドリンクメニューへ</button>
            </Link>
            <div className={css.tid}>{param}</div>
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
    let res = await fetch('http://localhost:3000/api/getMeetData');

    let data = await res.json();

    return {
        props: {
            data,
        },
    };
}


