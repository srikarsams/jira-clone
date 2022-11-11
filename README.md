# Jira clone using NextJS and Prisma (WIP)

Built using NextJS, Prisma, SQLite, TypeScript and TailwindCSS (In Progress)

- Create an `.env` file with the following code. Please use your own JWT seed.

```
DATABASE_URL=file:./dev.db
APP_URL=http://localhost:3000
JWT_SECRET=ao238cj8
```
- Execute the following command for setting up the database and seeding your db.

```
yarn setup-db
npx prisma db seed
```
- Launch the app using the following command

```
yarn dev
```

## Register page

<img src="/docs/register.jpeg" alt="register page" width="100%" />
