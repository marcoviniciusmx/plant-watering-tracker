import pool from './db.js'

async function testeConection() {
    try {
        const result = await pool.query(`
            SELECT NOW()
        `)

        console.log('Horário do servidor no banco:', result.rows[0])
    } catch (erro) {
        console.error('Erro ao conectar ao banco de dados:', erro.message)
    }
}

testeConection()