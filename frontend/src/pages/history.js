import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import css from '@/styles/Home.module.css';
import Popup from '../../components/History_popup';
import Link from 'next/link';

export default function History() {
  const [data, setData] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [total, setTotal] = useState(0);

  const router = useRouter();
  const param = router.query.table;

  const handlePopupToggle = () => {
    setPopupVisible(!isPopupVisible);
  };

  useEffect(() => {
    // クライアントサイドでのデータ取得
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/getHistory?table_id=${param}`);
            const newData = await response.json();
            
            // 取得したデータをstateにセット
            setData(newData);

            // 先に合計金額のみを計算
            let totalAmount = 0;
            newData.forEach((item) => {
            totalAmount += item.price * item.number_of_pieces;
            });
            setTotal(totalAmount);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
  }, [param]); // paramが変更されたときだけ再取得する

    return (
        <>
        <header className={css.header}>
            <h1>注文履歴/小計</h1>
            <Link href={{ pathname: '/main_Meet', query: { table: param } }} passHref>
            <button className={css.menubar_left}>お肉メニュー</button>
            </Link>
            <Link href={{ pathname: '/main_Drink', query: { table: param } }}>
            <button className={css.menubar_left}>ドリンクメニュー</button>
            </Link>
            <Link href={{ pathname: '/history', query: { table: param } }}>
            <button className={css.menubar_right}>注文履歴</button>
            </Link>
        </header>
        <main className={css.main}>
            <a>{total}円</a> <button className={css.accounting} onClick={handlePopupToggle}>
            おあいそ
            </button>
            {data.map((item, index) => (
            <div className={css.block} key={index}>
                <a>{item.menu_name}</a>
                <br></br>
                <div className={css.price}>{item.price}円 × {item.number_of_pieces}</div>
            </div>
            ))}
            <Popup isVisible={isPopupVisible} onClose={handlePopupToggle} table_id={param} total={total} />
        </main>
        </>
    );
}
