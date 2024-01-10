// pages/api/insertData.js
import db from '../../db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const { table_id, menu_id, num } = req.body;

    if (!table_id || !menu_id || !num) {
      res.status(400).json({ error: 'table_id, menu_id, and num are required fields' });
      return;
    }

    // パラメータ化されたクエリ
    const query = 'INSERT INTO Orders (order_id, table_id, menu_id, number_of_pieces) VALUES (?, ?, ?, ?)';
    const values = [null, table_id, menu_id, num];

    // データベースへの挿入
    await new Promise((resolve, reject) => {
      db.query(query, values, (error, results, fields) => {
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
