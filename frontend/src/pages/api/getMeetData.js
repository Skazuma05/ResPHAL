import db from '../../db';

const query = 'SELECT * FROM Menu Where menu_id < 100';

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