import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import css from '@/styles/Home.module.css';
import Link from 'next/link';

import Popup from '../../../components/Accounting_popup'

export default function Accounting({ data }) {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedTableID, setselectedTableID] = useState();

    const [salesData, setsalesData] = useState(0);


    const handlePopupToggle = (table_id, sales_sum) => {
        setPopupVisible(!isPopupVisible);
        setselectedTableID(table_id);
        setsalesData(sales_sum)
    };
    return(
        <>
        <header className={css.header}>
            <h1>会計管理画面</h1>
            <Link href={{ pathname: '/staff/main_Staff' }}><button className={css.staff_menubar}>メインに戻る</button></Link>
        </header>

        <main className={css.main}>
            {Object.values(data).map((data, index) => (
                <div className={css.block_staff} onClick={() => handlePopupToggle(data.table_id, data.sales_sum)} key={index}>
                    <div className={css.textcenter}><a>{data.table_id}卓</a></div>
                </div>
            ))}
            <Popup isVisible={isPopupVisible} table_id={selectedTableID} sales_sum={salesData}/>
        </main>
        </>
    );
}

export async function getServerSideProps() {
    let res = await fetch(process.env.URL +'/api/getAccountingFlag');
    let data = await res.json();

    return {
        props: {
            data,
        },
    };
}