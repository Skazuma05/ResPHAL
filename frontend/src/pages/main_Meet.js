//　各テーブルごとのmain画面

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import css from '@/styles/Home.module.css';
import Link from 'next/link'

import Popup from '../../components/Order_popup';

import { useSearchParams } from 'next/navigation'

export default function Main({ data }) {
    const router = useRouter();
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedMenuName, setSelectedMenuName] = useState('');
    const [selectedMenuPrice, setselectedMenuPrice] = useState();

    const handlePopupToggle = (menu_name, price) => {
        setPopupVisible(!isPopupVisible);
        setSelectedMenuName(menu_name);
        setselectedMenuPrice(price)
    };

    // urlパラメータの取得
    const searchParams = useSearchParams()
    const param = searchParams.get('table')

    return (
        <>
        <header className={css.header}>
            <h1>お肉メニュー</h1>
            <Link href={{ pathname: '/main_Meet', query: { table: param } }} passHref><button className={css.menubar_left}>お肉メニュー</button></Link>
            <Link href={{ pathname: '/main_Drink', query: { table: param } }}><button className={css.menubar_left}>ドリンクメニュー</button></Link>
            <Link href={{ pathname: '/history', query: { table: param } }}><button className={css.menubar_right}>注文履歴</button></Link>
        </header>
        <main className={css.main}>
            {Object.values(data).map((data, index) => (
                <div className={css.block} onClick={() => handlePopupToggle(data.menu_name, data.price)} key={index}>
                    <a>{data.menu_name}</a>
                    <br></br>
                    <div className={css.price}>{data.price}円</div>
                </div>
            ))}
            <Popup isVisible={isPopupVisible} onClose={handlePopupToggle} menu_name={selectedMenuName} table_id={param} price={selectedMenuPrice} />
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


