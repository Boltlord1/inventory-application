import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL
export default new Pool({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
})