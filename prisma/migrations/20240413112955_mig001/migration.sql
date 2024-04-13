-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nanoid" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "dateOfBirth" TEXT,
    "description" TEXT,
    "languages" TEXT[],
    "nationalities" TEXT[],
    "brStateOfOrigin" TEXT,
    "cityOfOrigin" TEXT,
    "countryOfResidence" TEXT,
    "brStateOfResidence" TEXT,
    "cityOfResidence" TEXT,
    "socialsLinks" JSONB,
    "goUsers" JSONB,
    "imageLink" TEXT,
    "ratePerHour" DECIMAL(65,30),
    "elo" DECIMAL(65,30),
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isWriter" BOOLEAN NOT NULL DEFAULT false,
    "isTeacher" BOOLEAN NOT NULL DEFAULT false,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "nanoid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "result" TEXT NOT NULL,
    "resultColor" TEXT NOT NULL,
    "resultByResignation" BOOLEAN NOT NULL,
    "resultByPoints" DECIMAL(65,30),
    "resultByTime" BOOLEAN NOT NULL DEFAULT false,
    "ranked" BOOLEAN NOT NULL DEFAULT true,
    "isolatedElo" BOOLEAN NOT NULL DEFAULT false,
    "eloBlack" DECIMAL(65,30) NOT NULL,
    "eloDeltaBlack" DECIMAL(65,30) NOT NULL,
    "bonusEloBlack" DECIMAL(65,30),
    "eloWhite" DECIMAL(65,30) NOT NULL,
    "eloDeltaWhite" DECIMAL(65,30) NOT NULL,
    "bonusEloWhite" DECIMAL(65,30),
    "komi" DECIMAL(65,30) NOT NULL DEFAULT 6.5,
    "rules" TEXT NOT NULL DEFAULT 'Japanese',
    "handicapStones" INTEGER NOT NULL DEFAULT 0,
    "handicapPoints" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "extraInfo" TEXT,
    "sgf" TEXT,
    "ogsLink" TEXT,
    "aiSenseiLink" TEXT,
    "otherLinks" JSONB,
    "winnerId" INTEGER NOT NULL,
    "blackId" INTEGER NOT NULL,
    "whiteId" INTEGER NOT NULL,
    "tournamentId" INTEGER,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tournament" (
    "id" SERIAL NOT NULL,
    "nanoid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "link" TEXT,
    "otherLinks" JSONB,
    "online" BOOLEAN NOT NULL DEFAULT false,
    "locationCountry" TEXT,
    "locationState" TEXT,
    "locationCity" TEXT,
    "host" TEXT,
    "address" TEXT,
    "pricing" JSONB,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "nanoid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "abstract" TEXT,
    "thumbnailLink" TEXT,
    "isDraft" BOOLEAN NOT NULL DEFAULT true,
    "authorId" INTEGER NOT NULL,
    "eventId" INTEGER,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "nanoid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "commenterId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "nanoid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalendarSlot" (
    "id" SERIAL NOT NULL,
    "nanoid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "eventId" INTEGER,

    CONSTRAINT "CalendarSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "nanoid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "isSubscription" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "nanoid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "units" INTEGER NOT NULL,
    "totalPaid" DECIMAL(65,30) NOT NULL,
    "address" TEXT,
    "requestMessage" TEXT,
    "purchaserId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nanoid_key" ON "User"("nanoid");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Game_nanoid_key" ON "Game"("nanoid");

-- CreateIndex
CREATE UNIQUE INDEX "Tournament_nanoid_key" ON "Tournament"("nanoid");

-- CreateIndex
CREATE UNIQUE INDEX "Article_nanoid_key" ON "Article"("nanoid");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_nanoid_key" ON "Comment"("nanoid");

-- CreateIndex
CREATE UNIQUE INDEX "Event_nanoid_key" ON "Event"("nanoid");

-- CreateIndex
CREATE UNIQUE INDEX "CalendarSlot_nanoid_key" ON "CalendarSlot"("nanoid");

-- CreateIndex
CREATE UNIQUE INDEX "Product_nanoid_key" ON "Product"("nanoid");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_nanoid_key" ON "Sale"("nanoid");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_blackId_fkey" FOREIGN KEY ("blackId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_whiteId_fkey" FOREIGN KEY ("whiteId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commenterId_fkey" FOREIGN KEY ("commenterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarSlot" ADD CONSTRAINT "CalendarSlot_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_purchaserId_fkey" FOREIGN KEY ("purchaserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
