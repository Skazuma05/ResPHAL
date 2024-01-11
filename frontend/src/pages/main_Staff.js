import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import css from '@/styles/Home.module.css';
import Link from 'next/link';

import Popup from '../../components/Provide_popup';

export default function Staff( {data} ) {
    return(
        <>
        <header className={css.header}>
            <h1>スタッフ画面</h1>
            <Link href={{ pathname: '/main_Staff' }}><button className={css.staff_menubar}>注文一覧</button></Link>
            <Link href={{ pathname: '/main_Staff' }}><button className={css.staff_menubar}>会計確認</button></Link>
        </header>

        <main className={css.main}>
            {Object.values(data).map((data, index) => (
                <div className={css.block_staff}>
                    <a>{data.table_id}卓</a>　<a>{data.menu_name}</a><a>×{data.number_of_pieces}</a>
                </div>
            ))}
        </main>
        </>
    );
}

export async function getStaticProps() {
    let res = await fetch('http://localhost:3000/api/getOrderAllData');
    let data = await res.json();

    return {
        props: {
            data,
        },
    };
}