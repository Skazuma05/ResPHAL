import db from '../../db';
import { useSearchParams } from 'next/navigation'

// urlパラメータの取得
const searchParams = useSearchParams();
const param = searchParams.get('table');

// パラメータ化されたクエリ
const query = 'select * from Orders where table_id = ? order by order_id desc;';
const values = [param];


export default async function handler(req, res) {
    db.query(query, values, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.status(200).json(results);
    });
}