import React from 'react';
import styled from 'styled-components';

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const Popup = ({ isVisible, onClose, message}) => {
  return (
    <>
      {isVisible && (
        <PopupContainer>
          <p>これはポップアップです。</p>
          <p>{message}</p>
          <button onClick={onClose}>閉じる</button>
        </PopupContainer>
      )}
    </>
  );
};

export default Popup;