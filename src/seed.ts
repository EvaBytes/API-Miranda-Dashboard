import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { Room } from './models/roomsModels';
import { Booking } from './models/bookingsModels';
import { User } from './models/usersModels';
import { Contact } from './models/contactModels';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/MirandaHotel');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
};

const generateFakeBooking = () => {
    return {
        photo: faker.image.url(), 
        roomPhoto: [faker.image.url(), faker.image.url()], 
        roomNumber: faker.string.alphanumeric(5), 
        roomType: faker.lorem.word(),
        facilities: faker.lorem.words(5),
        rate: faker.finance.amount(),
        offerPrice: faker.finance.amount(),
        status: faker.helpers.arrayElement(['Check-In', 'Check-Out', 'In Progress']),
        guest: {
            fullName: faker.person.fullName(), 
            reservationNumber: faker.string.alphanumeric(10),
            image: faker.image.avatar(),
        },
        orderDate: faker.date.past().toISOString(),
        checkIn: faker.date.future().toISOString(),
        checkOut: faker.date.future().toISOString(),
        specialRequest: faker.lorem.sentence(),
    };
};

const generateFakeRoom = () => {
    return {
        roomPhoto: faker.image.url(), 
        roomNumber: faker.string.alphanumeric(5),
        roomType: faker.lorem.word(),
        facilities: faker.lorem.words(5),
        rate: faker.finance.amount(),
        offerPrice: faker.finance.amount(),
        status: faker.helpers.arrayElement(['Available', 'Booked']),
        guest: {
            fullName: faker.person.fullName(), 
            reservationNumber: faker.string.alphanumeric(10), 
            image: faker.image.avatar(),
        },
        orderDate: faker.date.past().toISOString(),
        checkIn: faker.date.future().toISOString(),
        checkOut: faker.date.future().toISOString(),
        description: faker.lorem.sentence(),
        offer: faker.lorem.sentence(),
        discount: faker.finance.amount(),
        cancellationPolicy: faker.lorem.sentence(),
        amenities: [faker.lorem.word(), faker.lorem.word()],
        photos: [faker.image.url(), faker.image.url()],
    };
};

const generateFakeContact = () => {
    return {
        photo: faker.image.avatar(),
        date: faker.date.past().toISOString(),
        messageId: faker.string.alphanumeric(10),
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        subject: faker.lorem.sentence(),
        comment: faker.lorem.paragraph(),
        status: faker.helpers.arrayElement(['unread', 'read']),
    };
};

const generateFakeUser = () => {
    return {
        photo: faker.image.avatar(),
        name: faker.person.fullName(),
        employeeId: faker.string.alphanumeric(5),
        email: faker.internet.email(),
        password: faker.internet.password(),
        startDate: faker.date.past().toISOString(),
        description: faker.lorem.sentence(),
        contact: faker.phone.number(),
        status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']),
    };
};


const seedDatabase = async () => {
    try {
        await connectDB();
        await Booking.deleteMany({});
        await Room.deleteMany({});
        await Contact.deleteMany({});
        await User.deleteMany({});

        const fakeRooms = Array.from({ length: 10 }, generateFakeRoom);
        const fakeBookings = Array.from({ length: 10 }, generateFakeBooking);
        const fakeUsers = Array.from({ length: 10 }, generateFakeUser);
        const fakeContacts = Array.from({ length: 10 }, generateFakeContact);

        await Room.insertMany(fakeRooms);
        await Booking.insertMany(fakeBookings);
        await User.insertMany(fakeUsers);
        await Contact.insertMany(fakeContacts);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.disconnect();
    }
};

seedDatabase();