# Anthill v2

Anthill v2 is an application for tracking work time across various task categories. Users can create and modify activities, and then assign specific amounts of time spent on each activity in a global panel.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Installation

Instructions on how to install and set up the project.

```bash
# Clone the repository
git clone https://github.com/dawidzygmunt/Anthill.git

# Navigate to the project directory
cd Anthill

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
# Edit .env with your configuration

# Start database
docker-compose -f docker-compose.yaml up -d

# Run migrations
npx prisma migrate dev

# (Optional) Seed with example data
npm run seed

# Run project
npm run dev
```

## Configuration

Before running the project, you need to set up the environment variables.

Copy .env.example to .env:

```bash
cp .env.example .env
```

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/antnext?schema=public` |
| `BASE_PATH` | (Optional) Base path for deployment | `/anthill` |
| `NEXT_PUBLIC_BASE_PATH` | (Optional) Public base path for PWA manifest | `/anthill` |

Open the .env file and configure these variables as needed.

## Usage

To use Anthill v2, follow these steps:

### Create Activities:

Navigate to the "Settings" section.
Click on "Add Activity" to create a new activity.
Fill in the details and save.

### Track Time:

Go to the "Home Page".
Select an activity from the list.
Assign the amount of time spent on the selected activity.
Save your entries to update the time tracking.
Example
Here is an example of how to use the application:

Creating an Activity:

- Click on "Add Activity".
- Enter "Coding" as the activity name and save the activity.

Assigning Time:

- In the "Global Panel", select "Coding".
- Enter time in minutes e.g "120" as the time spent.

## Features

List of features included in Anthill v2:

Create and modify activities.
Track time spent on each activity.
View and manage all activities in a global panel.
Detailed analytics on time spent per activity.

## Contributing

Guidelines for contributing to Anthill v2.

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature-branch).
Open a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Next
- Docker
- Prisma
- Postgres
