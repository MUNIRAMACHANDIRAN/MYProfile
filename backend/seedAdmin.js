require('dotenv').config();
const bcrypt = require('bcryptjs');
const sequelize = require('./config/database');
const User = require('./models/User');

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: false });

        const email = 'muniramachandiran@gmail.com';
        const existing = await User.findOne({ where: { email } });

        if (existing) {
            // Update to admin if exists
            await existing.update({ role: 'admin', isActive: 1 });
            console.log('✅ Existing user updated to admin role.');
        } else {
            const hashedPassword = await bcrypt.hash('admin@1234', 12);
            await User.create({
                name: 'Muniyappan R',
                email,
                password: hashedPassword,
                role: 'admin',
                isActive: 1,
            });
            console.log('✅ Admin user created successfully!');
        }

        console.log('📧 Email   : muniramachandiran@gmail.com');
        console.log('🔑 Password: admin@1234');
        console.log('👑 Role    : admin');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed failed:', err.message);
        process.exit(1);
    }
})();
