import * as bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import { connectDB } from './src/database/db';
import { Booking } from './src/models/bookingsModels';
import { Contact } from './src/models/contactModels';
import { Room } from './src/models/roomsModels';
import { User } from './src/models/usersModels';

const generateFakeBooking = (index: number) => {
    const checkInDate = faker.date.future();
    const checkOutDate = new Date(checkInDate.getTime() + (2 * 24 * 60 * 60 * 1000));
        const rate = parseFloat(faker.finance.amount(100, 1000, 2)); 
    let offerPrice = faker.helpers.maybe(() => parseFloat(faker.finance.amount(50, rate - 1, 2)));
    
    return {
        photo: faker.image.url(),
        roomPhoto: [faker.image.url(), faker.image.url()],
        roomNumber: `RN-${index}`, 
        roomType: faker.helpers.arrayElement(["Single Bed", "Double Bed","Double Bed Superior", "Suite"]),
        facilities: faker.helpers.arrayElements(["Air conditioner","High speed WiFi","Breakfast","Kitchen","Cleaning","Shower","Grocery","Single bed","Shop near","Towels","24/7 Online Support","Strong locker","Smart Security","Expert Team"],{ min: 1, max: 5 }),
        rate: rate.toFixed(2),
        offerPrice: offerPrice ? offerPrice.toFixed(2) : null, 
        status: faker.helpers.arrayElement(['Check-In', 'Check-Out', 'In Progress']),
        guest: {
            fullName: faker.person.fullName(),
            reservationNumber: `RES-${index}`, 
            image: faker.image.avatar(),
        },
        orderDate: faker.date.past().toISOString(),
        checkIn: checkInDate.toISOString(),
        checkOut: checkOutDate.toISOString(),
        specialRequest: faker.lorem.sentence(),
    };
};

const generateFakeRoom = (index: number) => {
    const checkInDate = faker.date.future();
    const checkOutDate = new Date(checkInDate.getTime() + (2 * 24 * 60 * 60 * 1000));
    const rate = parseFloat(faker.finance.amount(100, 1000, 2)); 
    const offerPrice = faker.helpers.maybe(() => parseFloat(faker.finance.amount(50, rate - 1, 2)));

    return {
        roomPhoto: faker.image.url(),
        roomNumber: `ROOM-${index}`, 
        roomType: faker.helpers.arrayElement(["Single Bed", "Double Bed","Double Bed Superior", "Suite"]),
        facilities: faker.helpers.arrayElements(["Air conditioner","High speed WiFi","Breakfast","Kitchen","Cleaning","Shower","Grocery","Single bed","Shop near","Towels","24/7 Online Support","Strong locker","Smart Security","Expert Team"],{ min: 1, max: 5 }),
        rate: rate.toFixed(2),
        offerPrice: offerPrice ? offerPrice.toFixed(2) : null, 
        status: faker.helpers.arrayElement(['Available', 'Booked']),
        guest: faker.helpers.maybe(() => ({
            fullName: faker.person.fullName(),
            reservationNumber: `RES-${index}`,
            image: faker.image.avatar(),
        })),        
        orderDate: faker.date.past().toISOString(),
        checkIn: checkInDate.toISOString(),
        checkOut: checkOutDate.toISOString(),
    };
};


const generateFakeContact = (index: number) => {
    return {
        photo: faker.image.avatar(),
        date: faker.date.past().toISOString(),
        messageId: `MSG-${index}`, 
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        subject: faker.lorem.sentence(),
        comment: faker.lorem.paragraph(),
        status: faker.helpers.arrayElement(['unread', 'read']),
    };
};

const generateFakeUser = (index: number) => {
    const hashedPassword = bcrypt.hashSync(faker.internet.password(), 15);

    return {
        photo: faker.image.avatar(),
        name: faker.person.fullName(),
        employeeId: `EMP-${index}`, 
        email: `user${index}@example.com`, 
        password: hashedPassword, 
        startDate: faker.date.past().toISOString(),
        description: faker.helpers.arrayElement(['General Manager', 'Front Desk Receptionist', 'Chef de Cuisine','Spa Therapist','User']),
        contact: faker.phone.number(),
        status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']),
    };
};

const seedDatabase = async () => {
    await connectDB();
    
    try {
        await Booking.deleteMany({});
        await Room.deleteMany({});
        await Contact.deleteMany({});
        await User.deleteMany({});

        const fakeBookings = Array.from({ length: 10 }, (_, index) => generateFakeBooking(index));
        const fakeRooms = Array.from({ length: 10 }, (_, index) => generateFakeRoom(index));
        const fakeContacts = Array.from({ length: 10 }, (_, index) => generateFakeContact(index));
        const fakeUsers = Array.from({ length: 10 }, (_, index) => generateFakeUser(index));
        
        await Booking.insertMany(fakeBookings);
        await Room.insertMany(fakeRooms);
        await Contact.insertMany(fakeContacts);
        await User.insertMany(fakeUsers);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error.message);
    }
};

seedDatabase();
