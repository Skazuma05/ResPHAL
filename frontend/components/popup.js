// メニューを押したときに出てくるpopup
// メニューの名前が表示され、個数選択(最大3)の後に注文確定

import React from 'react';
import styled from 'styled-components';
import css from '@/styles/Home.module.css';

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

const Popup = ({ isVisible, onClose, menu_name, menu_id}) => {
    return (
        <>
        {isVisible && (
            <PopupContainer>
            <h2>{menu_name}</h2>
            <p>個数を選択してください</p>
            <p>(最大数:3人前)</p>
            <select id="NUM" name="selectnum">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>人前
            <button className={css.oderDecision}>注文</button>
            <br></br>
            <p></p>
            <button className={css.oderCancel}onClick={onClose}>キャンセル</button>

            </PopupContainer>
        )}
        </>
    );
};

export default Popup;