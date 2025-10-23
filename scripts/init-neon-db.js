const { Client } = require('pg');

async function initializeDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Connected to Neon database');

    // Read and execute the schema
    const fs = require('fs');
    const path = require('path');
    
    const schemaPath = path.join(__dirname, '../database/01_neon_schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    await client.query(schema);
    console.log('Database schema initialized successfully');

    // Insert some sample data
    const sampleData = `
      INSERT INTO campaigns (id, title, description, status, signature_count, created_at, expires_at, location, category, urgency, progress) VALUES
      ('1', 'Fix Mumbai Roads', 'Campaign to fix potholes and improve road infrastructure in Mumbai', 'active', 1250, NOW(), NOW() + INTERVAL '60 days', 'Mumbai, Maharashtra', 'infrastructure', 'high', 75),
      ('2', 'Clean Ganga River', 'Demand immediate action to clean and restore the ecological balance of the Ganga River', 'active', 800, NOW(), NOW() + INTERVAL '90 days', 'Varanasi, Uttar Pradesh', 'environment', 'medium', 50)
      ON CONFLICT (id) DO NOTHING;
    `;

    await client.query(sampleData);
    console.log('Sample data inserted successfully');

  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

if (require.main === module) {
  initializeDatabase();
}

module.exports = { initializeDatabase };
