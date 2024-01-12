import db from '../../db';

export default async function handler(req, res) {
    const table_id = await req.query.table_id;
    // パラメータ化されたクエリ
    const query = 'select * from Orders where table_id = ? order by order_id desc;';
    const values = [table_id]

    db.query(query, values, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.status(200).json(results);
    });
}