import db from '../../db';

export default async function handler(req, res) {
    const table_id = req.query.table_id;
    // パラメータ化されたクエリ
    const query = 'SELECT * FROM Orders WHERE table_id = ? ORDER BY  order_id DESC';
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