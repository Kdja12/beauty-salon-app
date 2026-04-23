const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    host: process.env.DB_HOST || 'postgres',
    user: process.env.DB_USER || 'salon_admin',
    password: process.env.DB_PASSWORD || 'salon_pass',
    database: process.env.DB_NAME || 'beauty_salon',
    port: 5432,
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', team: 'Алиева, Никитин, Поленка, Хлопецкий, Васюнин, Пугачев' });
});

app.get('/api/services', async (req, res) => {
    const result = await pool.query('SELECT * FROM services');
    res.json(result.rows);
});

app.get('/api/masters', async (req, res) => {
    const result = await pool.query('SELECT * FROM masters');
    res.json(result.rows);
});

app.post('/api/appointments', async (req, res) => {
    const { client_name, client_phone, service_id, master_id, appointment_time } = req.body;
    const result = await pool.query(
        'INSERT INTO appointments (client_name, client_phone, service_id, master_id, appointment_time) VALUES ($1,$2,$3,$4,$5) RETURNING *',
        [client_name, client_phone, service_id, master_id, appointment_time]
    );
    res.json(result.rows[0]);
});

app.listen(5000, () => console.log('Backend running on port 5000'));
