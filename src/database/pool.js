import { Pool } from 'pg'

let connectionString = process.env.POSTGRES_URL
if (!connectionString) {
	console.error('No database connection string found')
} else {
    const url = new URL(connectionString)
    url.searchParams.delete('sslmode')
    connectionString = url.toString()
}

export default new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
	max: 1
})