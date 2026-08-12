CREATE TABLE "notes" (
	"user" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"user" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"clerk_id" text NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "user_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_user_id_user_clerk_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("clerk_id") ON DELETE cascade ON UPDATE no action;