import * as bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import { sequelize } from './src/database/db'; 
import { BookingModel } from './src/models/bookingsModels';
import { RoomModel } from './src/models/roomsModels';
import { MessageModel } from './src/models/contactModels';
import { UserModel } from './src/models/usersModels';

const generateFakeBooking = (index: number) => {
    const checkInDate = faker.date.future();
    const checkOutDate = new Date(checkInDate.getTime() + 2 * 24 * 60 * 60 * 1000);
    const rate = parseFloat(faker.finance.amount({ min: 100, max: 1000, dec: 2 }));
    const offerPrice = faker.helpers.maybe(() => parseFloat(faker.finance.amount({ min: 50, max: rate - 1, dec: 2 })));

    return {
        roomNumber: `ROOM-${index}`,
        guest: {
            fullName: faker.person.fullName(),
            reservationNumber: `RES-${index}`,
            image: faker.image.avatar(),
        },
        rate,
        offerPrice: offerPrice || null,
        status: faker.helpers.arrayElement(['In-Progress', 'Check-in', 'Check-out']),
        orderDate: faker.date.past(),
        checkIn: checkInDate,
        checkOut: checkOutDate,
        specialRequest: faker.lorem.sentence(),
    };
};

const generateFakeRoom = (index: number) => {
    const checkInDate = faker.date.future();
    const checkOutDate = new Date(checkInDate.getTime() + 2 * 24 * 60 * 60 * 1000);
    const rate = parseFloat(faker.finance.amount({ min: 100, max: 1000, dec: 2 }));
    const offerPrice = faker.helpers.maybe(() => parseFloat(faker.finance.amount({ min: 50, max: rate - 1, dec: 2 })));

    return {
        roomPhoto: faker.image.url(),
        roomNumber: `ROOM-${index}`,
        roomType: faker.helpers.arrayElement(["Single Bed", "Double Bed", "Double Bed Superior", "Suite"]),

        facilities: JSON.stringify(faker.helpers.arrayElements(
            ["Air conditioner", "WiFi", "Breakfast", "Kitchen", "Cleaning", "Towels", "24/7 Support"],
            { min: 1, max: 5 }
        )),
        rate: rate.toString(),  
        offerPrice: offerPrice ? offerPrice.toString() : null,  
        status: faker.helpers.arrayElement(['Available', 'Booked']),
        guest: JSON.stringify({
            fullName: faker.person.fullName(),
            reservationNumber: `RES-${index}`,
            image: faker.image.avatar(),
        }),
        orderDate: faker.date.past().toISOString(),
        checkIn: checkInDate.toISOString(),
        checkOut: checkOutDate.toISOString(),
    };
};


const generateFakeContact = (index: number) => ({
    photo: faker.image.avatar(),
    date: faker.date.past().toISOString(),
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    subject: faker.lorem.sentence(),
    comment: faker.lorem.paragraph(),
    status: faker.helpers.arrayElement(['unread', 'read']),
});

const generateFakeUser = async (index: number) => {
    const password = process.env.DEFAULT_USER_PASSWORD || 'password';
    const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS) || 10);

    return {
        photo: faker.image.avatar(),
        name: faker.person.fullName(),
        employeeId: `EMP-${index}`,
        email: `user${index}@example.com`,
        password: hashedPassword,
        startDate: faker.date.past().toISOString(),
        description: faker.helpers.arrayElement(['General Manager', 'Receptionist', 'Chef', 'Therapist', 'User']),
        contact: faker.phone.number(),
        status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']),
    };
};

const insertData = async () => {
    try {
        await BookingModel.destroy({ where: {} });
        await RoomModel.destroy({ where: {} });
        await MessageModel.destroy({ where: {} });
        await UserModel.destroy({ where: {} });

        const bookings = Array.from({ length: 20 }, (_, i) => generateFakeBooking(i));
        const rooms = Array.from({ length: 20 }, (_, i) => generateFakeRoom(i));
        const contacts = Array.from({ length: 20 }, (_, i) => generateFakeContact(i));
        const users = await Promise.all(Array.from({ length: 10 }, (_, i) => generateFakeUser(i)));

        await BookingModel.bulkCreate(bookings);
        console.log(`Inserted ${bookings.length} bookings`);

        await RoomModel.bulkCreate(rooms);
        console.log(`Inserted ${rooms.length} rooms`);

        await MessageModel.bulkCreate(contacts);
        console.log(`Inserted ${contacts.length} contacts`);

        await UserModel.bulkCreate(users);
        console.log(`Inserted ${users.length} users`);

        console.log("Database seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

insertData();

