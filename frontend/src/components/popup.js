// メニューを押したときに出てくるpopup
// メニューの名前が表示され、個数選択(最大3)の後に注文確定

import React from 'react';
import styled from 'styled-components';

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

const Popup = ({ isVisible, onClose, name}) => {
    return (
        <>
        {isVisible && (
            <PopupContainer>
            <p></p>
            <p></p>
            <button onClick={onClose}>キャンセル</button>
            </PopupContainer>
        )}
        </>
    );
};

export default Popup;