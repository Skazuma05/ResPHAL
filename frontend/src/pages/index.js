import React, { useEffect, useState } from 'react';

export default function Home({ data }) {
  return (
    <div>
      <h1>Data from MySQL Database</h1>
      {data.map((data, index) => (
                <div key={index}>
                    <a>{data.sales_id}</a>
                    <br></br>
                    <span>{data.date}</span>
                </div>
            ))}
    </div>
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


