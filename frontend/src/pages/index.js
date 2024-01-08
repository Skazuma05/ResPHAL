import React, { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css'
import Popup from '../components/popup';

export default function Home({ data }) {
    const [isPopupVisible, setPopupVisible] = useState(false);

    const handlePopupToggle = () => {
      setPopupVisible(!isPopupVisible);
    };

    return (
        <main>
            <h1>Data from MySQL Database</h1>
            {data.map((data, index) => (
                        <div key={index}>
                            <button>{data.sales_id}</button>
                            <br></br>
                            <span>{data.date}</span>
                        </div>
                    ))}
            <button onClick={handlePopupToggle}>ポップアップ表示</button>
            <Popup isVisible={isPopupVisible} onClose={handlePopupToggle} message = "aiueo"/>
        </main>
    );
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/getData');
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}


