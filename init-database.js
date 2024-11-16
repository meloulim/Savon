import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

// Définition des schémas directement ici pour éviter les problèmes d'import
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Création des modèles
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

const initialProducts = [
  {
    name: "Savon à la Lavande de Provence",
    description: "Savon artisanal à la lavande, fabriqué à partir d'huiles végétales bio et d'huile essentielle de lavande pure.",
    price: 12.90,
    stock: 50,
    image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214",
    category: "Savons"
  },
  {
    name: "Crème Hydratante au Lait d'Ânesse",
    description: "Crème visage nourrissante et régénérante au lait d'ânesse bio et beurre de karité.",
    price: 29.90,
    stock: 30,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc",
    category: "Cosmétiques"
  },
  {
    name: "Parfum Rose de Mai",
    description: "Eau de parfum naturelle aux notes de rose de mai, jasmin et bergamote.",
    price: 49.90,
    stock: 20,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539",
    category: "Senteurs"
  },
  {
    name: "Savon au Lait d'Ânesse",
    description: "Savon doux et onctueux au lait d'ânesse, idéal pour les peaux sensibles.",
    price: 14.90,
    stock: 40,
    image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8",
    category: "Lait d'ânesse"
  }
];

const adminUser = {
  name: "Admin",
  email: "admin@savonnerie-montmartre.fr",
  password: await bcrypt.hash("Admin123!", 8),
  role: "admin"
};

async function initializeDatabase() {
  try {
    console.log('🔄 Connexion à MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB Atlas');

    // Réinitialiser les collections
    await mongoose.connection.db.dropDatabase();
    console.log('🗑️ Base de données réinitialisée');

    // Créer l'utilisateur admin
    const user = new User(adminUser);
    await user.save();
    console.log('👤 Utilisateur admin créé');

    // Créer les produits
    await Product.insertMany(initialProducts);
    console.log('📦 Produits initiaux créés');

    console.log('✨ Initialisation de la base de données terminée avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Déconnexion de MongoDB');
  }
}

initializeDatabase();