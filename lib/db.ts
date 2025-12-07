import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Database file paths
const DB_DIR = path.join(process.cwd(), 'database');
const VOLUNTEERS_DB = path.join(DB_DIR, 'volunteers.json');
const CHILDREN_DB = path.join(DB_DIR, 'children.json');

// Ensure database directory exists
if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initialize database files if they don't exist
if (!fs.existsSync(VOLUNTEERS_DB)) {
    fs.writeFileSync(VOLUNTEERS_DB, JSON.stringify([], null, 2));
}

if (!fs.existsSync(CHILDREN_DB)) {
    fs.writeFileSync(CHILDREN_DB, JSON.stringify([], null, 2));
}

// Types
export interface Volunteer {
    id: string;
    email: string;
    passwordHash: string;
    fullName: string;
    phone: string;
    idNumber: string;
    documentPath?: string;
    approved: boolean;
    createdAt: string;
}

export interface Child {
    id: string;
    username: string;
    passwordHash: string;
    age: number;
    parentEmail: string;
    parentConsent: boolean;
    createdAt: string;
}

// Utility functions
export function hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
    return hashPassword(password) === hash;
}

export function generateId(): string {
    return crypto.randomBytes(16).toString('hex');
}

// Volunteer database operations
export function getAllVolunteers(): Volunteer[] {
    const data = fs.readFileSync(VOLUNTEERS_DB, 'utf-8');
    return JSON.parse(data);
}

export function getVolunteerByEmail(email: string): Volunteer | null {
    const volunteers = getAllVolunteers();
    return volunteers.find(v => v.email === email) || null;
}

export function getVolunteerById(id: string): Volunteer | null {
    const volunteers = getAllVolunteers();
    return volunteers.find(v => v.id === id) || null;
}

export function createVolunteer(volunteer: Omit<Volunteer, 'id' | 'createdAt'>): Volunteer {
    const volunteers = getAllVolunteers();

    // Check if email already exists
    if (volunteers.some(v => v.email === volunteer.email)) {
        throw new Error('Email already exists');
    }

    const newVolunteer: Volunteer = {
        ...volunteer,
        id: generateId(),
        createdAt: new Date().toISOString(),
    };

    volunteers.push(newVolunteer);
    fs.writeFileSync(VOLUNTEERS_DB, JSON.stringify(volunteers, null, 2));

    return newVolunteer;
}

export function updateVolunteer(id: string, updates: Partial<Volunteer>): Volunteer | null {
    const volunteers = getAllVolunteers();
    const index = volunteers.findIndex(v => v.id === id);

    if (index === -1) return null;

    volunteers[index] = { ...volunteers[index], ...updates };
    fs.writeFileSync(VOLUNTEERS_DB, JSON.stringify(volunteers, null, 2));

    return volunteers[index];
}

// Child database operations
export function getAllChildren(): Child[] {
    const data = fs.readFileSync(CHILDREN_DB, 'utf-8');
    return JSON.parse(data);
}

export function getChildByUsername(username: string): Child | null {
    const children = getAllChildren();
    return children.find(c => c.username === username) || null;
}

export function getChildById(id: string): Child | null {
    const children = getAllChildren();
    return children.find(c => c.id === id) || null;
}

export function createChild(child: Omit<Child, 'id' | 'createdAt'>): Child {
    const children = getAllChildren();

    // Check if username already exists
    if (children.some(c => c.username === child.username)) {
        throw new Error('Username already exists');
    }

    const newChild: Child = {
        ...child,
        id: generateId(),
        createdAt: new Date().toISOString(),
    };

    children.push(newChild);
    fs.writeFileSync(CHILDREN_DB, JSON.stringify(children, null, 2));

    return newChild;
}

export function updateChild(id: string, updates: Partial<Child>): Child | null {
    const children = getAllChildren();
    const index = children.findIndex(c => c.id === id);

    if (index === -1) return null;

    children[index] = { ...children[index], ...updates };
    fs.writeFileSync(CHILDREN_DB, JSON.stringify(children, null, 2));

    return children[index];
}
