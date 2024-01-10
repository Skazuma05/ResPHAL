import db from '../../db';

export default async function handler(req, res) {
    db.query('select * from Orders where table_id = 1 order by order_id desc;', (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.status(200).json(results);
    });
}