//　一番最初にアクセスする画面
// 実際には利用客からは見えない(見ようと思えば普通に見れる)

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import css from '@/styles/Home.module.css'
import Link from 'next/link'

export default function Home({ data }) {
    return (
        <>
        <Head><title>main</title></Head>
        <header className={css.header}><h1>メイン画面</h1></header>
        <main className={css.main}>
            {Object.values(data).map((data, index) => (
                <div key={index}>
                    <Link href={{ pathname: '/main', query: { table: data.table_id } }} passHref>
                        <button>{data.table_id}</button>
                    </Link>
                </div>
            ))}
        </main>
        </>
        
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
