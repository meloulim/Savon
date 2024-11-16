import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  try {
    console.log('🔄 Tentative de connexion à MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
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