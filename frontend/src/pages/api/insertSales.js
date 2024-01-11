// pages/api/insertData.js
import db from '../../db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const { table_id, sales_sum } = req.body;

    if (!table_id || !sales_sum) {
      res.status(400).json({ error: 'table_id, sales_sum are required fields' });
      return;
    }

    // パラメータ化されたクエリ
    const query1 = 'INSERT INTO Sales (sales_id, date, sales_sum) VALUES (?, now(), ?)';
    const values1 = [null, sales_sum];

    const query2 = 'UPDATE Table_master SET accounting_flag = 1 WHERE table_id = ?';
    const values2 = [table_id];

    // データベースへの挿入
    await new Promise((resolve, reject) => {
      db.query(query1, values1, (error, results, fields) => {
        if (error) {
          console.error(error);
          reject('Internal Server Error');
        } else {
          resolve();
        }
      });

      db.query(query2, values2, (error, result, fields) => {
        if (error) {
            console.error(error);
            reject('Internal Server Error');
          } else {
            resolve();
          }
      });
    });

    res.status(201).json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
