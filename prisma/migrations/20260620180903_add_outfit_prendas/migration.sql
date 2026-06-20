/*
  Warnings:

  - You are about to drop the column `clima` on the `outfits` table. All the data in the column will be lost.
  - You are about to drop the column `ocasion` on the `outfits` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_outfits" (
    "id_output" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "categoria" TEXT,
    "descripcion" TEXT,
    "temporada" TEXT,
    "imagen_url" TEXT,
    "fecha_creacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    CONSTRAINT "outfits_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_outfits" ("createdAt", "descripcion", "fecha_creacion", "id_output", "id_usuario", "nombre", "updatedAt") SELECT "createdAt", "descripcion", "fecha_creacion", "id_output", "id_usuario", "nombre", "updatedAt" FROM "outfits";
DROP TABLE "outfits";
ALTER TABLE "new_outfits" RENAME TO "outfits";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
