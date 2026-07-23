import { Pool } from 'pg'
import 'dotenv/config'
import pg from 'pg'

pg.types.setTypeParser(1082, (value) => value)


const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

export default pool