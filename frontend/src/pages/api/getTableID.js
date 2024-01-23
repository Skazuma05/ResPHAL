import db from '../../db';

export default async function handler(req, res) {
    const query = 'SELECT * FROM Table_master';

    db.query(query, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.status(200).json(results);
    });
}