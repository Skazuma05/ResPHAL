// pages/api/insertData.js
import db from '../../db';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    try {
        const { table_id } = req.body;

        if (!order_id) {
            res.status(400).json({ error: '_table_id is Required Fields' });
            return;
        }

        // パラメータ化されたクエリ
        const query = 'SELECT sales_sum FROM Sales WHERE table_id = ?';
        const values = [table_id];

        // データベースへの挿入
        await new Promise((resolve, reject) => {
            db.query(query, values, (error, results, fields) => {
                if (error) {
                    console.error(error);
                    reject('Internal Server Error');
                } else {
                    resolve();
                }
                console.log(values)
                res.status(200).json(results);
            });
        });

        res.status(201).json({ message: 'Data inserted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
