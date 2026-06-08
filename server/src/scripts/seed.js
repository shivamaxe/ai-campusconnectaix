import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { Student } from '../models/Student.js';
import { Company } from '../models/Company.js';
import { Department } from '../models/Department.js';
import { Course } from '../models/Course.js';
import { Job } from '../models/Job.js';

dotenv.config();

import { MongoMemoryServer } from 'mongodb-memory-server';

export const seedData = async (existingUri = null) => {
  try {
    // If no existingUri, we're running standalone — connect ourselves
    if (!existingUri) {
      let uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/campusconnect';
      try {
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
        console.log('Connected to local DB for seeding');
      } catch (localErr) {
        console.log('Local MongoDB not found. Spinning up in-memory MongoDB Server for seeding...');
        const mongoServer = await MongoMemoryServer.create();
        uri = mongoServer.getUri();
        await mongoose.connect(uri);
        console.log('Connected to In-Memory DB for seeding');
      }
    } else {
      console.log('Using existing DB connection for seeding...');
    }

    // Clear existing data
    await User.deleteMany();
    await Department.deleteMany();
    await Course.deleteMany();
    await Company.deleteMany();
    await Job.deleteMany();

    // Create Department
    const csDept = await Department.create({
      name: 'Computer Science',
      code: 'CS',
      description: 'Department of Computer Science and Engineering',
    });

    // Create Admin using the base User collection directly (bypass discriminator routing)
    // Since 'admin' has no discriminator, we insert directly into the collection.
    const adminPassword = await import('bcryptjs').then(bcrypt => bcrypt.default.hash('password123', 12));
    const adminDoc = await mongoose.connection.collection('users').insertOne({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@campusconnect.com',
      password: adminPassword,
      role: 'admin',
      avatar: 'default.jpg',
      isActive: true,
      refreshTokens: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('Admin user created');

    // Create Student (uses the Student discriminator model)
    const student = await Student.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@student.com',
      password: 'password123',
      role: 'student',
      rollNumber: 'CS2023001',
      departmentId: csDept._id,
      semester: 6,
      cgpa: 8.5,
      skills: ['React', 'Node.js', 'MongoDB'],
    });
    console.log('Student user created');

    // Create Company (standalone model, NOT a User)
    const company = await Company.create({
      name: 'Google',
      industry: 'Technology',
      website: 'https://google.com',
      tier: 'dream',
      description: 'A multinational technology company.',
      avgPackage: 25,
      locations: ['Bangalore', 'Hyderabad'],
    });
    console.log('Company created');

    // Create a recruiter user for the company
    const recruiterPassword = await import('bcryptjs').then(bcrypt => bcrypt.default.hash('password123', 12));
    await mongoose.connection.collection('users').insertOne({
      firstName: 'Google',
      lastName: 'Recruiter',
      email: 'recruiter@google.com',
      password: recruiterPassword,
      role: 'recruiter',
      avatar: 'default.jpg',
      isActive: true,
      refreshTokens: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('Recruiter user created');

    // Create Job
    await Job.create({
      companyId: company._id,
      companyName: company.name,
      title: 'Software Engineer Intern',
      description: 'Looking for a passionate software engineer intern.',
      type: 'internship',
      package: { stipend: 50000 },
      location: 'Remote',
      requiredSkills: ['React', 'Node.js'],
      eligibilityCriteria: { minCGPA: 8.0, eligibleDepartments: ['CS'] },
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: 'open',
    });
    console.log('Job created');

    console.log('✅ Data seeded successfully!');
    if (!existingUri) process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    if (!existingUri) process.exit(1);
  }
};

if (process.argv[1] && process.argv[1].includes('seed.js')) {
  seedData();
}
