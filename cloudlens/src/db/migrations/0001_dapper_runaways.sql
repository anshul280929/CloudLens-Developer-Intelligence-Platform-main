CREATE TABLE "detectedService" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"scanId" uuid,
	"repositoryId" uuid NOT NULL,
	"serviceName" text NOT NULL,
	"serviceCategory" text NOT NULL,
	"provider" text NOT NULL,
	"confidenceScore" real NOT NULL,
	"detectionSource" text NOT NULL,
	"evidenceFile" text,
	"evidenceLine" integer,
	"evidenceSnippet" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "repository" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"githubId" text NOT NULL,
	"name" text NOT NULL,
	"fullName" text NOT NULL,
	"owner" text NOT NULL,
	"isPrivate" boolean NOT NULL,
	"defaultBranch" text NOT NULL,
	"lastCommitAt" timestamp,
	"htmlUrl" text NOT NULL,
	"description" text,
	"language" text,
	"scanStatus" text DEFAULT 'pending' NOT NULL,
	"lastScannedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scan" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"repositoryId" uuid NOT NULL,
	"status" text NOT NULL,
	"startedAt" timestamp DEFAULT now() NOT NULL,
	"completedAt" timestamp,
	"filesScanned" integer,
	"servicesFound" integer,
	"errorMessage" text
);
--> statement-breakpoint
ALTER TABLE "detectedService" ADD CONSTRAINT "detectedService_scanId_scan_id_fk" FOREIGN KEY ("scanId") REFERENCES "public"."scan"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "detectedService" ADD CONSTRAINT "detectedService_repositoryId_repository_id_fk" FOREIGN KEY ("repositoryId") REFERENCES "public"."repository"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "repository" ADD CONSTRAINT "repository_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scan" ADD CONSTRAINT "scan_repositoryId_repository_id_fk" FOREIGN KEY ("repositoryId") REFERENCES "public"."repository"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "user_repo_github_idx" ON "repository" USING btree ("userId","githubId");