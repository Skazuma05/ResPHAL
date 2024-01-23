import db from '../../db';

export default async function handler(req, res) {
    const query = 'SELECT order_id, table_id, menu_name, number_of_pieces FROM Orders';

    db.query(query, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.status(200).json(results);
    });
}