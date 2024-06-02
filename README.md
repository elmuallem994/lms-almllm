# Build a Course & LMS Platform: Next 13, React, Stripe, Mux, Prisma, Tailwind, MySQL | Udemy Clone

![Project Screenshot](path_to_your_screenshot.png)

In this 10-hour tutorial, you will learn how to create your very own LMS (Learning Management System) platform. We are going to use the latest tech such as Next 13 with the App Router, Prisma as an ORM, Stripe for payments, and many more.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## Features

- User Authentication and Authorization
- Course Management (Create, Read, Update, Delete)
- Video Streaming with Mux
- Payment Integration with Stripe
- Database Management with Prisma and MySQL
- Responsive Design with Tailwind CSS

## Technologies Used

- **Next.js 13**: The latest version of Next.js with the App Router.
- **React**: For building the user interface.
- **Stripe**: For handling payments.
- **Mux**: For video streaming.
- **Prisma**: An ORM for database management.
- **Tailwind CSS**: For styling the application.
- **MySQL**: The database used for storing application data.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js installed on your local machine
- MySQL server set up
- Stripe and Mux accounts for payment and video streaming services

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username/your_repo.git
   ```

Install NPM packages

npm install

Create a .env.local file and add your environment variables

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
DATABASE_URL='mysql://user:password@localhost:3306/dbname'
STRIPE_API_KEY=your_stripe_api_key
MUX_TOKEN_ID=your_mux_token_id
MUX_TOKEN_SECRET=your_mux_token_secret

Run the development server

Usage
Once the development server is running, you can access the application at http://localhost:3000. You can register as a new user, create and manage courses, and process payments.

Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
License
Distributed under the MIT License. See LICENSE for more information.

Contact
Your Name - @your_twitter - email@example.com

Project Link: https://github.com/your_username/your_repo

Acknowledgments
Next.js
React
Stripe
Mux
Prisma
Tailwind CSS
MySQL
