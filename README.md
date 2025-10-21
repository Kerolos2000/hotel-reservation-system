# Hotel Reservation System

A modern, fully responsive hotel reservation system built with React, TypeScript, and Zustand.

## Features

- **Room Browsing**: View available hotel rooms with detailed information
- **Advanced Filtering**: Filter rooms by type and price range
- **User Authentication**: Sign up and login functionality
- **Room Booking**: Select check-in/check-out dates and book rooms
- **Reservation Management**: View and cancel your reservations
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **State Management**: Zustand
- **Form Management**: React Hook Form
- **Validation**: Zod
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Notifications**: Sonner
- **Build Tool**: Vite

## Project Structure

\`\`\`
src/
├── components/        # Reusable UI components
├── config/           # Configuration files
├── constants/        # Application constants
├── enums/            # TypeScript enums
├── hooks/            # Custom React hooks
├── layouts/          # Layout components
├── lib/              # Utility functions and helpers
├── pages/            # Page components
├── routes/           # Route definitions
├── stores/           # Zustand stores
├── styles/           # Global styles
├── types/            # TypeScript type definitions
└── validation/       # Zod validation schemas
\`\`\`

## Getting Started

### Installation

\`\`\`bash
yarn install
\`\`\`

### Development

\`\`\`bash
yarn dev
\`\`\`

The application will be available at `http://localhost:5173`

### Build

\`\`\`bash
yarn build
\`\`\`

### Preview

\`\`\`bash
yarn preview
\`\`\`

## Usage

### Browsing Rooms

1. Navigate to the home page
2. Use filters to search by room type and price range
3. Click on a room card to view details

### Booking a Room

1. Click on a room to view its details
2. Sign in if you haven't already
3. Select check-in and check-out dates
4. Review the total price
5. Click "Confirm Booking"

### Managing Reservations

1. Go to your dashboard
2. View all your active reservations
3. Cancel a reservation if needed

## Demo Credentials

- **Email**: demo@example.com
- **Password**: password123

## Features Implemented

- ✅ User authentication (login/signup)
- ✅ Room listing with filtering
- ✅ Room details page
- ✅ Booking system with date selection
- ✅ Reservation management
- ✅ Responsive design
- ✅ Form validation with Zod
- ✅ Toast notifications
- ✅ Protected routes

## Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All pages are fully responsive and optimized for all screen sizes.

## Notes

- This is a frontend-only implementation with mock data
- Authentication uses local storage for demo purposes
- All room data is stored in Zustand stores
- Reservations are managed client-side

## Future Enhancements

- Backend API integration
- Real authentication with JWT
- Payment processing
- Email notifications
- Advanced search and filtering
- User reviews and ratings
- Admin dashboard
