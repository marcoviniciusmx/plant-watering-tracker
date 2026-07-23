import pool from '../database/db.js'

export async function plantsList(req, res) {
    try {
        const result = await pool.query('SELECT * FROM plants')

        const data = result.rows
        res.json(data)
    } catch (error) {
        console.log('Erro ao listar plantas', error)
        res.status(500).json({ error: error.message })
    }
}

export async function createPlant(req, res) {
    try {
        const { name, species, watering_interval_days } = req.body

        if (!name || !species || !watering_interval_days) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
        }

        const result = await pool.query(
            ` INSERT INTO plants (name, species, watering_interval_days)
            VALUES ($1, $2, $3)
            RETURNING*`,
            [name, species, watering_interval_days]
        )

        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error('Erro ao cadastrar planta', error)
        res.status(500).json({ error: error.message })
    }
}

export async function updatePlant(req, res) {
    try {
        const { id } = req.params
        const { name, species, watering_interval_days } = req.body

        if (!name || !species || !watering_interval_days) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
        }

        const result = await pool.query(
            ` UPDATE plants 
        SET name = $1, species = $2, watering_interval_days = $3
        WHERE id = $4
        RETURNING*`,
        [name, species, watering_interval_days, id]
        )

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'ID Inexistente'})
        }

        res.status(200).json(result.rows[0])
    } catch (error) {
        console.log('Erro ao atualizar planta', error)
        res.status(500).json({ error: error.message })
    }
} 