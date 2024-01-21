import db from '../../db';

const query = 'SELECT order_id, table_id, menu_name, number_of_pieces FROM Orders WHERE provide_flag = 0;';

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