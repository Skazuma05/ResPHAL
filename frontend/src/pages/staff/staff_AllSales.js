import React, { useEffect, useState } from 'react';
import css from '@/styles/Home.module.css';

export default function Main({ data }) {
    let totalSales = 0;
    {Object.values(data).map((data) => (
        totalSales += data.sales_sum
    ))}
    return (
        <>
            <header className={css.header}>
                <h1>売上確認</h1>
            </header>
            <main className={css.main}>
                <p className={css.totalSales}>本日の合計売上金額</p>
                <p className={css.totalSales}>{totalSales}円</p>
            </main>
            
        </>
    );
}


export async function getServerSideProps() {
    let res = await fetch(process.env.URL + '/api/getSalesDataNow');
    let data = await res.json();
    return {
        props: {
            data,
        },
    };
}


