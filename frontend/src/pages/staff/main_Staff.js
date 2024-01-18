import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import css from '@/styles/Home.module.css';
import Link from 'next/link';


export default function Staff() {
    return (
        <>
            <header className={css.header}>
                <h1>スタッフメイン画面</h1>
            </header>
            <main className={css.main}>
            <Link href={{ pathname: '/staff/staff_OrderManeger' }}><button className={css.staff_main}>注文一覧</button></Link>
            <Link href={{ pathname: '/staff/staff_Accounting' }}><button className={css.staff_main}>会計確認</button></Link>
            <Link href={{ pathname: '/staff/staff_SoMenu' }}><button className={css.staff_main}>売り切れ管理</button></Link>
            <Link href={{ pathname: '/staff/staff_RevivalMenu' }}><button className={css.staff_main}>補充管理</button></Link>
            <Link href={{ pathname: '/staff/staff_AllSales' }}><button className={css.staff_main}>売上確認</button></Link>
            </main>
        </>
    );
}