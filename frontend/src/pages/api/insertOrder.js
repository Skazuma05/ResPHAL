// pages/api/insertData.js
import db from '../../db';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    try {
        const { table_id, menu_name, num, price } = req.body;

        if (!table_id || !menu_name || !num || !price) {
            res.status(400).json({ error: 'table_id, menu_id, num and price are Required Fields' });
            return;
        }

        // パラメータ化されたクエリ
        const query = 'INSERT INTO Orders (order_id, table_id, menu_name, number_of_pieces, price, provide_flag) VALUES (?, ?, ?, ?, ?, 0)';
        const values = [null, table_id, menu_name, num, price];

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

        res.status(201).json({ message: 'Data Inserted Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
