import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import * as fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger les variables d'environnement
const envPath = join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.error('❌ Fichier .env non trouvé');
  process.exit(1);
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Variable MONGODB_URI non définie dans le fichier .env');
  process.exit(1);
}

async function testConnection() {
  try {
    console.log('🔄 Tentative de connexion à MongoDB Atlas...');
    console.log('URI utilisée:', MONGODB_URI.replace(/:[^:]*@/, ':****@')); // Masquer le mot de passe dans les logs
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connexion à MongoDB Atlas réussie !');
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📚 Collections disponibles:', collections.map(c => c.name));
    
  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Déconnexion de MongoDB');
  }
}

testConnection();