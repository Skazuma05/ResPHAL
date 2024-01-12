import db from '../../db';

const query = 'SELECT table_id, sales_sum FROM Table_master WHERE accounting_flag = 1;';

export default async function handler(req, res) {
    db.query(query, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.status(200).json(results);
    });
}