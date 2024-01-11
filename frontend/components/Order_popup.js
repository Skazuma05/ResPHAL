// メニューを押したときに出てくるpopup
// メニューの名前が表示され、個数選択(最大3)の後に注文確定

import React from 'react';
import Router, { useRouter } from 'next/router'
import styled from 'styled-components';
import css from '@/styles/Home.module.css';
import { useState } from 'react';

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const Popup = ({ isVisible, onClose, menu_name, table_id, price}) => {
    const router = useRouter()

    let [selectedValue, setSelectedValue] = useState('1');
    const handleSelectChange = (event) => {
        setSelectedValue(parseInt(event.target.value, 10));
    };

    const sendOrderData = async () => {
        const apiUrl = '/api/insertOrder';  // APIエンドポイントのURL
        try {
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                table_id: table_id,  // 送信するデータの具体的な値
                menu_name: menu_name,
                num: selectedValue,
                price: price,
              }),
            });
        
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const data = await response.json();
            console.log(data);  // サーバーからのレスポンスをログに表示
          } catch (error) {
            console.error('Error:', error);
          }

        router.reload();
        
        alert("注文が完了しました。");
    }

    const handlecancel = () => {
        router.reload();
    };

    return (
        <>
        {isVisible && (
            <PopupContainer>
            <h2>{menu_name}</h2>
            <p>個数を選択してください</p>
            <p>(最大数:3人前)</p>
            <select id="NUM" name="selectnum" onChange={handleSelectChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>人前
            <button className={css.oderDecision} onClick={() => sendOrderData(table_id, menu_name, selectedValue)}>注文</button>
            <br></br>
            <p></p>
            <button className={css.oderCancel} onClick={handlecancel}>キャンセル</button>
            <p>{selectedValue}</p>
            </PopupContainer>
        )}
        </>
    );
};

export default Popup;
