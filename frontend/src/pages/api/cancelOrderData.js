import db from '../../db';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    try {
        const { order_id } = req.body;

        if (!order_id) {
            res.status(400).json({ error: 'Order_id is Required Fields' });
            return;
        }

        // パラメータ化されたクエリ
        const query = 'DELETE FROM Orders WHERE order_id = ?';
        const values = [order_id];

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
            });
        });

        res.status(201).json({ message: 'Data Inserted Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
