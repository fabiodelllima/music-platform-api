CREATE TYPE "PAYMENT_METHODS" AS ENUM ('debito', 'credito', 'pix');


CREATE TABLE IF NOT EXISTS "clients" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(45) NOT NULL,
	"email" VARCHAR(60) NOT NULL UNIQUE
);


CREATE TABLE IF NOT EXISTS "payment_infos" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(45) NOT NULL,
	"number" VARCHAR(16) NOT NULL,
	"due_date" DATE NOT NULL,
	"code" VARCHAR(3) NOT NULL,
	"method" "PAYMENT_METHODS" NOT NULL,
	"client_id" INTEGER UNIQUE,
	FOREIGN KEY ("client_id")
		REFERENCES "clients"("id")
		ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS "playlists" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(45) NOT NULL,
	"created_at" TIMESTAMP DEFAULT NOW(),
	"client_id" INTEGER,
	FOREIGN KEY ("client_id")
		REFERENCES "clients"("id")
		ON DELETE SET NULL
);