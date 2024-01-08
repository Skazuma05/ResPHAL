import React, { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css'
import Link from 'next/link'


export default function Home({ data }) {
    return (
        <main className={styles.main}>
            <h1>メイン画面</h1>
            {data.map((data, index) => (
                <div key={index}>
                    <Link href={{ pathname: '/main', query: { table: data.table_id }}} passHref>
                        <button>{data.table_id}</button>
                    </Link>
                </div>
            ))}
        </main>
    );
}


export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/getTableID');
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
