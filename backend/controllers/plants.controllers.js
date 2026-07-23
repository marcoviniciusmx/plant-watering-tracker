import pool from '../database/db.js'

export async function plantsList(req, res){
    try {
        const result = await pool.query('SELECT * FROM plants')

        const data = result.rows
        res.json(data)
    } catch (error) {
        console.log('Erro ao listar plantas', error)
        res.status(500).json({ error: error.message })
    }
}