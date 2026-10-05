require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./model/User');
const Product = require('./model/Product');

// Demo login credentials:
// Admins: admin1@shopnest.test / ShopNestAdmin123!
//         admin2@shopnest.test / ShopNestAdmin123!
// Users:  user1@shopnest.test through user3@shopnest.test / ShopNestUser123!

const users = [
    { name: 'Avery Admin', email: 'admin1@shopnest.test', password: 'ShopNestAdmin123!', role: 'admin', verified: true },
    { name: 'Morgan Admin', email: 'admin2@shopnest.test', password: 'ShopNestAdmin123!', role: 'admin', verified: true },
    { name: 'Jamie Carter', email: 'user1@shopnest.test', password: 'ShopNestUser123!', role: 'user', verified: true },
    { name: 'Taylor Reed', email: 'user2@shopnest.test', password: 'ShopNestUser123!', role: 'user', verified: true },
    { name: 'Riley Shah', email: 'user3@shopnest.test', password: 'ShopNestUser123!', role: 'user', verified: true },
];

const products = [
    { name: 'Classic Cotton T-Shirt', description: 'A soft, everyday cotton t-shirt with a comfortable fit.', price: 599, category: 'Clothing', stock: 40, imageUrl: 'https://placehold.co/600x600?text=Cotton+T-Shirt', rating: 4.4, numReviews: 18 },
    { name: 'Canvas Everyday Backpack', description: 'A durable canvas backpack with room for daily essentials.', price: 1499, category: 'Accessories', stock: 22, imageUrl: 'https://placehold.co/600x600?text=Canvas+Backpack', rating: 4.6, numReviews: 12 },
    { name: 'Insulated Steel Water Bottle', description: 'A reusable stainless steel bottle for hot and cold drinks.', price: 899, category: 'Home', stock: 35, imageUrl: 'https://placehold.co/600x600?text=Water+Bottle', rating: 4.2, numReviews: 9 },
    { name: 'Wireless Bluetooth Headphones', description: 'Lightweight wireless headphones with cushioned ear cups.', price: 2499, category: 'Electronics', stock: 15, imageUrl: 'https://placehold.co/600x600?text=Headphones', rating: 4.5, numReviews: 27 },
    { name: 'Ceramic Coffee Mug Set', description: 'A set of two sturdy ceramic mugs for your coffee or tea.', price: 799, category: 'Home', stock: 28, imageUrl: 'https://placehold.co/600x600?text=Coffee+Mugs', rating: 4.3, numReviews: 14 },
    { name: 'Everyday Running Shoes', description: 'Breathable, cushioned shoes for walks and daily workouts.', price: 3299, category: 'Footwear', stock: 18, imageUrl: 'https://placehold.co/600x600?text=Running+Shoes', rating: 4.7, numReviews: 31 },
    { name: 'Minimal Desk Lamp', description: 'A compact adjustable desk lamp for reading and focused work.', price: 1799, category: 'Home', stock: 12, imageUrl: 'https://placehold.co/600x600?text=Desk+Lamp', rating: 4.1, numReviews: 7 },
    { name: 'Everyday Cotton Tote Bag', description: 'A reusable cotton tote bag for shopping and daily errands.', price: 399, category: 'Accessories', stock: 50, imageUrl: 'https://placehold.co/600x600?text=Cotton+Tote', rating: 4.0, numReviews: 11 },
    { name: 'Stainless Steel Cookware Set', description: 'A practical three-piece cookware set for everyday meals.', price: 3999, category: 'Kitchen', stock: 10, imageUrl: 'https://placehold.co/600x600?text=Cookware+Set', rating: 4.5, numReviews: 16 },
    { name: 'Classic Analog Wristwatch', description: 'A simple everyday wristwatch with a clean, timeless dial.', price: 2199, category: 'Accessories', stock: 14, imageUrl: 'https://placehold.co/600x600?text=Wristwatch', rating: 4.3, numReviews: 20 },
];

async function seed() {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is missing. Add it to backend/.env before running this script.');
    }

    await mongoose.connect(process.env.MONGO_URI);

    const userOperations = await Promise.all(users.map(async ({ password, ...user }) => ({
        updateOne: {
            filter: { email: user.email },
            update: { $set: { ...user, password: await bcrypt.hash(password, 10) } },
            upsert: true,
        },
    })));
    const userResult = await User.bulkWrite(userOperations);

    const productOperations = products.map((product) => ({
        updateOne: {
            filter: { name: product.name },
            update: { $set: product },
            upsert: true,
        },
    }));
    const productResult = await Product.bulkWrite(productOperations);

    console.log(`Seed complete: ${userResult.upsertedCount} users added, ${userResult.modifiedCount} users updated; ${productResult.upsertedCount} products added, ${productResult.modifiedCount} products updated.`);
}

seed()
    .catch((error) => {
        console.error('Seed failed:', error.message);
        process.exitCode = 1;
    })
    .finally(async () => {
        await mongoose.disconnect();
    });
