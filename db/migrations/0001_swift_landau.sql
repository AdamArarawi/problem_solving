-- جزء من ملف SQL الذي تم إنشاؤه
CREATE TYPE "code_language" AS ENUM ('py', 'cpp', 'ts', 'js');

ALTER TABLE "examples" ADD COLUMN "language" "code_language" DEFAULT 'py' NOT NULL;