import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import css from '@/styles/Home.module.css';
import Link from 'next/link';

import Popup from '../../../components/SoMenu_popup';

export default function Main({ data }) {
    const router = useRouter();
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedMenuName, setSelectedMenuName] = useState('');
    const [selectedMenuID, setSelectedMenuID] = useState();

    const handlePopupToggle = (menu_id, menu_name) => {
        setPopupVisible(!isPopupVisible);
        setSelectedMenuName(menu_name);
        setSelectedMenuID(menu_id);
    };

    return (
        <>
            <header className={css.header}>
                <h1>売り切れ管理</h1>
                <Link href={{ pathname: '/staff/main_Staff'}} passHref><button className={css.staff_menubar}>メインに戻る</button></Link>
            </header>
            <main className={css.main}>
                {Object.values(data).map((data, index) => (
                    <div className={css.block} onClick={() => handlePopupToggle(data.menu_id, data.menu_name)} key={index}>
                        <a>{data.menu_name}</a>
                        <br></br>
                        <div className={css.price}>{data.price}円</div>
                    </div>
                ))}
                <Popup isVisible={isPopupVisible} onClose={handlePopupToggle} menu_id={selectedMenuID} menu_name={selectedMenuName}/>
            </main>
        </>
    );
}


export async function getServerSideProps() {
    let res = await fetch(process.env.URL + '/api/getAllMenuData');
    let data = await res.json();

    return {
        props: {
            data,
        },
    };
}


