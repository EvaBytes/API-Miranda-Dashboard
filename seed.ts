import * as bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import { connectDB } from './src/database/db';

const generateFakeBooking = (index: number) => {
    const checkInDate = faker.date.future();
    const checkOutDate = new Date(checkInDate.getTime() + 2 * 24 * 60 * 60 * 1000);
    const rate = parseFloat(faker.finance.amount({ min: 100, max: 1000, dec: 2 }));
    const offerPrice = faker.helpers.maybe(() => parseFloat(faker.finance.amount({ min: 50, max: rate - 1, dec: 2 })));

    return [
        faker.image.url(),
        JSON.stringify([faker.image.url(), faker.image.url()]),
        `RN-${index}`,
        faker.helpers.arrayElement(["Single Bed", "Double Bed", "Double Bed Superior", "Suite"]),
        JSON.stringify(faker.helpers.arrayElements(
            ["Air conditioner", "WiFi", "Breakfast", "Kitchen", "Cleaning", "Towels", "24/7 Support"],
            { min: 1, max: 5 }
        )),
        rate,
        offerPrice || null,
        faker.helpers.arrayElement(['Check-In', 'Check-Out', 'In Progress']),
        JSON.stringify({
            fullName: faker.person.fullName(),
            reservationNumber: `RES-${index}`,
            image: faker.image.avatar(),
        }),
        faker.date.past().toISOString(),
        checkInDate.toISOString(),
        checkOutDate.toISOString(),
        faker.lorem.sentence(),
    ];
};

const generateFakeRoom = (index: number) => {
    const checkInDate = faker.date.future();
    const checkOutDate = new Date(checkInDate.getTime() + 2 * 24 * 60 * 60 * 1000);
    const rate = parseFloat(faker.finance.amount({ min: 100, max: 1000, dec: 2 }));
    const offerPrice = faker.helpers.maybe(() => parseFloat(faker.finance.amount({ min: 50, max: rate - 1, dec: 2 })));

    return [
        faker.image.url(),
        `ROOM-${index}`,
        faker.helpers.arrayElement(["Single Bed", "Double Bed", "Double Bed Superior", "Suite"]),
        JSON.stringify(faker.helpers.arrayElements(
            ["Air conditioner", "WiFi", "Breakfast", "Kitchen", "Cleaning", "Towels", "24/7 Support"],
            { min: 1, max: 5 }
        )),
        rate,
        offerPrice || null,
        faker.helpers.arrayElement(['Available', 'Booked']),
        faker.helpers.maybe(() => JSON.stringify({
            fullName: faker.person.fullName(),
            reservationNumber: `RES-${index}`,
            image: faker.image.avatar(),
        })) || null,
        faker.date.past().toISOString(),
        checkInDate.toISOString(),
        checkOutDate.toISOString(),
    ];
};

const generateFakeContact = (index: number) => [
    faker.image.avatar(),
    faker.date.past().toISOString(),
    `MSG-${index}`,
    faker.person.fullName(),
    faker.internet.email(),
    faker.phone.number(),
    faker.lorem.sentence(),
    faker.lorem.paragraph(),
    faker.helpers.arrayElement(['unread', 'read']),
];

const generateFakeUser = async (index: number) => {
    const password = process.env.DEFAULT_USER_PASSWORD || 'password';
    const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS) || 10);

    return [
        faker.image.avatar(),
        faker.person.fullName(),
        `EMP-${index}`,
        `user${index}@example.com`,
        hashedPassword,
        faker.date.past().toISOString(),
        faker.helpers.arrayElement(['General Manager', 'Receptionist', 'Chef', 'Therapist', 'User']),
        faker.phone.number(),
        faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']),
    ];
};

const insertData = async () => {
    const connection = await connectDB();

    try {
        await connection.query('DELETE FROM Bookings');
        await connection.query('DELETE FROM Rooms');
        await connection.query('DELETE FROM Contacts');
        await connection.query('DELETE FROM Users');

        const bookings = Array.from({ length: 10 }, (_, i) => generateFakeBooking(i));
        await connection.query(
            `INSERT INTO Bookings (photo, roomPhoto, roomNumber, roomType, facilities, rate, offerPrice, status, guest, orderDate, checkIn, checkOut, specialRequest) VALUES ?`,
            [bookings]
        );
        console.log(`Inserted ${bookings.length} bookings`);

        const rooms = Array.from({ length: 10 }, (_, i) => generateFakeRoom(i));
        await connection.query(
            `INSERT INTO Rooms (roomPhoto, roomNumber, roomType, facilities, rate, offerPrice, status, guest, orderDate, checkIn, checkOut) VALUES ?`,
            [rooms]
        );
        console.log(`Inserted ${rooms.length} rooms`);

        const contacts = Array.from({ length: 5 }, (_, i) => generateFakeContact(i));
        await connection.query(
            `INSERT INTO Contacts (photo, date, messageId, fullName, email, phone, subject, comment, status) VALUES ?`,
            [contacts]
        );
        console.log(`Inserted ${contacts.length} contacts`);

        const users = await Promise.all(Array.from({ length: 5 }, (_, i) => generateFakeUser(i)));
        await connection.query(
            `INSERT INTO Users (photo, name, employeeId, email, password, startDate, description, contact, status) VALUES ?`,
            [users]
        );
        console.log(`Inserted ${users.length} users`);

        console.log("Database seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

insertData();
