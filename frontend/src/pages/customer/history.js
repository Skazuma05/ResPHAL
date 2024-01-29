import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import css from '@/styles/Home.module.css';
import Popup from '../../../components/History_popup';
import Link from 'next/link';

import { useSearchParams } from 'next/navigation';

export default function History() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const param = searchParams.get('table');

  const [data, setData] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [total, setTotal] = useState(0);

  const handlePopupToggle = () => {
    setPopupVisible(!isPopupVisible);
  };

  useEffect(() => {
    // クライアントサイドでのデータ取得
    const fetchData = async () => {
        try {
        const response = await fetch(`/api/getHistory?table_id=` + param);
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
        console.error('データの取得エラー:', error);
        }
    };

    fetchData();
  }, [param]); // paramが変更されたときだけ再取得する

  return (
    <>
      <header className={css.header}>
        <h1>注文履歴/小計</h1>
        <Link href={{ pathname: '/customer/meatMenuData', query: { table: param } }} passHref><button className={css.menubar_left}>お肉メニュー</button></Link>
        <Link href={{ pathname: '/customer/drinkMenuData', query: { table: param } }}><button className={css.menubar_left}>ドリンクメニュー</button></Link>
        <Link href={{ pathname: '/customer/history', query: { table: param } }}><button className={css.menubar_right}>注文履歴</button></Link>
      </header>
      <main className={css.main}>
        <a className={css.total}>現在の合計金額:{total}円</a>
        <button className={css.accounting} onClick={handlePopupToggle}>おあいそ</button>
        {data.map((item, index) => (
            <div className={css.block} key={index}>
                <a>{item.menu_name}</a>
                <br></br>
                <div className={css.price}>
                    {item.price}円 × {item.number_of_pieces}
                </div>
            </div>
        ))}
        <Popup isVisible={isPopupVisible} onClose={handlePopupToggle} table_id={param} total={total} />
      </main>
    </>
  );
}
