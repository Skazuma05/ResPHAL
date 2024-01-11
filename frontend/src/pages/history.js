import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import css from '@/styles/Home.module.css';
import Popup from '../../components/History_popup';
import Link from 'next/link'
import Script from 'next/script';

import { useSearchParams } from 'next/navigation'

export default function History({ data }) {
    const searchParams = useSearchParams()
    const param = searchParams.get('table')

    const [isPopupVisible, setPopupVisible] = useState(false);
    const handlePopupToggle = () => {
        setPopupVisible(!isPopupVisible);
    };

    // 先に合計金額のみを計算
    let Total = 0;
    {Object.values(data).map((data, index) => (
        <div key={index} >
            <Script id="total">{Total = Total + (data.price * data.number_of_pieces)}</Script>
        </div>
    ))}
    
    return(
        <>
        <header className={css.header}>
            <h1>注文履歴/小計</h1>
            <Link href={{ pathname: '/main_Meet', query: { table: param } }} passHref><button className={css.menubar_left}>お肉メニュー</button></Link>
            <Link href={{ pathname: '/main_Drink', query: { table: param } }}><button className={css.menubar_left}>ドリンクメニュー</button></Link>
            <Link href={{ pathname: '/history', query: { table: param } }}><button className={css.menubar_right}>注文履歴</button></Link>
        </header>
        <main className={css.main}>
            <a>{Total}円</a> <button className={css.accounting} onClick={() => handlePopupToggle()}>おあいそ</button>
            {Object.values(data).map((data, index) => (
                <div className={css.block} key={index}>
                    <a>{data.menu_name}</a>
                    <br></br>
                    <div className={css.price}>{data.price}円 × {data.number_of_pieces}</div>
                </div>
            ))}
            <Popup isVisible={isPopupVisible} onClose={handlePopupToggle} table_id={param} total={Total} />
        </main>
        </>
    );
}

export async function getStaticProps() {
    let res = await fetch('http://localhost:3000/api/getHistory');
    let data = await res.json();
    return {
        props: {
            data,
        },
    };
}