//おあいそ時のpopup

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

const Popup = ({ isVisible, onClose, table_id, total }) => {
    const router = useRouter()

    let [selectedValue, setSelectedValue] = useState('1');

    const sendHistoryData = async () => {
        const apiUrl = '/api/insertSales';  // APIエンドポイントのURL
        try {
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                table_id: table_id,  // 送信するデータの具体的な値
                sales_sum: total,
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
        
        alert("お会計を受け付けました。");

        location.href = '/end';
    }

    const handlecancel = () => {
        router.reload();
    };

    return (
        <>
        {isVisible && (
            <PopupContainer>
            <h3>お会計に進みますか？</h3>
            <button className={css.oderDecision} onClick={() => sendHistoryData()}>進む</button>
            <button className={css.oderCancel} onClick={handlecancel}>キャンセル</button>
            </PopupContainer>
        )}
        </>
    );
};

export default Popup;
