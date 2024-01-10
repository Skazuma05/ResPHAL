import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import css from '@/styles/Home.module.css';
import Popup from '../../components/popup';
import Link from 'next/link'
import Script from 'next/script';

import { useSearchParams } from 'next/navigation'

export default function History({ data }) {
    const searchParams = useSearchParams()
    const param = searchParams.get('table')

    // 先に合計金額のみを計算
    let Total = 0;
    {Object.values(data).map((data, index) => (<Script>{Total = Total + data.price}</Script>))}
    
    return(
        <>
        <header className={css.header}>
            <h1>注文履歴/小計</h1>
            <Link href={{ pathname: '/main_Meet', query: { table: param } }} passHref><button className={css.menubar_left}>お肉メニュー</button></Link>
            <Link href={{ pathname: '/main_Drink', query: { table: param } }}><button className={css.menubar_left}>ドリンクメニュー</button></Link>
            <Link href={{ pathname: '/history', query: { table: param } }}><button className={css.menubar_right}>注文履歴</button></Link>
        </header>
        <main className={css.main}>
            <p>{Total}</p>
            {Object.values(data).map((data, index) => (
                <div className={css.block} key={index}>
                    <a>{data.menu_id}</a>
                    <br></br>
                    <div className={css.price}>{data.price}円 × 1</div>
                </div>
            ))}
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