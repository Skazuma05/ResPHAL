import db from '../../db';

export default async function handler(req, res) {
    const query = 'SELECT * FROM Menu WHERE menu_id >= 100 AND so_flag = 0';

    db.query(query, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.status(200).json(results);
    });
}