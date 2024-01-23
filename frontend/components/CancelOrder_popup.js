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
  padding: 10px;
  width: 300px; 
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const Popup = ({ isVisible, onClose, table_id, order_id, menu_name}) => {
    const router = useRouter()

    const setFlagData = async () => {
        const apiUrl = '/api/cancelOrderData';  // APIエンドポイントのURL
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    order_id: order_id,  // 送信するデータの具体的な値
                }),
            });
        
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
        
            const data = await response.json();
            console.log(data);  // サーバーからのレスポンスをログに表示
        } catch (error) {
            console.error('Error:', error);
        }

        alert("注文情報を削除しました。");
        router.reload();
    }

    const handlecancel = () => {
        router.reload();
    };

    return (
        <>
        {isVisible && (
            <PopupContainer>
                <h3>{table_id}卓　{menu_name}</h3>
                <h4>注文を削除しますか？</h4>
                <button className={css.oderDecision} onClick={setFlagData}>はい</button>
                <button className={css.oderCancel} onClick={handlecancel}>いいえ</button>
            </PopupContainer>
        )}
        </>
    );
};

export default Popup;
