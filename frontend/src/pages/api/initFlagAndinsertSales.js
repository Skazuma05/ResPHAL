// pages/api/insertData.js
import db from '../../db';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    try {
        const { table_id, sales_sum } = req.body;

        if (!table_id) {
        res.status(400).json({ error: 'table_id and sales_sum are Required Fields' });
        return;
        }

        // パラメータ化されたクエリ
        const query1 = 'UPDATE Table_master SET accounting_flag = 0, sales_sum = 0 WHERE table_id = ?';
        const values1 = [table_id];

        const query2 = 'INSERT INTO Sales (sales_id, date, sales_sum) VALUES(null, now(), ?)';
        const values2 = [sales_sum];

        const query3 = 'DELETE FROM Orders WHERE table_id = ?';
        const values3 = [table_id];

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
            db.query(query2, values2, (error, results, fields) => {
                if (error) {
                    console.error(error);
                    reject('Internal Server Error');
                } else {
                    resolve();
                }
            });
            db.query(query3, values3, (error, results, fields) => {
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
