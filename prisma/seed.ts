import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    if (process.env.DEFAULT_ADMIN_PASSWORD === undefined)
        throw new Error('DEFAULT_ADMIN_PASSWORD .env variable is required');

    const plainPassword = process.env.DEFAULT_ADMIN_PASSWORD;
    const hashedPassword = await bcrypt.hash(plainPassword, 10); // 10 salt rounds

    const user = await prisma.users.create({
        data: {
            username: 'adminuser',
            email: 'admin@gmail.com',
            password: hashedPassword,
            is_admin: true,
            verification_code: '123456',
            verificated_at: new Date(),
            verification_code_sent_at: new Date(),
        },
    });

    console.log('Seeded user:', {
        ...user,
        password: plainPassword,
    }, null, 2);
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
    });
