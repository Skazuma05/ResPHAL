import db from '../../db';

export default async function handler(req, res) {
    db.query('SELECT * FROM Menu Where menu_id >= 100', (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.status(200).json(results);
    });
}