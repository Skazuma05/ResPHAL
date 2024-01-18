import db from '../../db';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    try {
        const { menu_id } = req.body;

        if (!menu_id) {
        res.status(400).json({ error: 'order_id is required fields' });
        return;
        }

        // パラメータ化されたクエリ
        const query = 'UPDATE Menu SET so_flag = 1 where menu_id = ?;';
        const values = [menu_id];

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

        res.status(201).json({ message: 'Data inserted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
