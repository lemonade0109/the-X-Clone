## This should be built fully from scratch by ME(Lemonade)

Npm packages to install:

1. zod for input validations
2. react-icons for icons
3. shadcn ui for pre built components
4. react toasts
5. prisma for database interactions
6. mongoDB to store the data
7. Cloudinary to store image and for image optimizations
8. Lucia Auth for creating user and authentications

steps to follow in building this project

1. create a diagram of how the routes would be
2. map out components needed from the routes
3. List out the features this project would have
4. structure out the data models needed for this project
5. start bulding the layouts first then we keep going on from there

// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
provider = "prisma-client-js"
}

datasource db {
provider = "mongodb"
url = env("DATABASE_URL")
}

model User {
clerkId String @id @map("\_id")
tweets Tweet[]
followers Follow[] @relation("userFollowers")
following Follow[] @relation("userFollowing")
Like Like[]
Comment Comment[]
}

model Follow {
id String @id @default(uuid()) @map("\_id")
follower User @relation("userFollowers", fields: [followerId], references: [clerkId])
followerId String
following User @relation("userFollowing", fields: [followingId], references: [clerkId])
followingId String
}

model Tweet {
id String @id @default(cuid()) @map("\_id")
content String
user User @relation(fields: [userId], references: [clerkId])
userId String
createdAt DateTime @default(now())
likes Like[]
comments Comment[]
}

model Like {
id String @id @default(auto()) @map("\_id") @db.ObjectId
tweet Tweet @relation(fields: [tweetId], references: [id])
tweetId String
user User @relation(fields: [userId], references: [clerkId])
userId String
createdAt DateTime @default(now())
}

model Comment {
id String @id @default(auto()) @map("\_id") @db.ObjectId
tweet Tweet @relation(fields: [tweetId], references: [id])
tweetId String
user User @relation(fields: [userId], references: [clerkId])
userId String
content String
createdAt DateTime @default(now())
}
