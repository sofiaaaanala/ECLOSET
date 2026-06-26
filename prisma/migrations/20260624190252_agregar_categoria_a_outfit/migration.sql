/*
  Warnings:

  - You are about to drop the `outfits` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "outfits";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Outfit" (
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
    CONSTRAINT "Outfit_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_OutfitToPrenda" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_OutfitToPrenda_A_fkey" FOREIGN KEY ("A") REFERENCES "Outfit" ("id_output") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_OutfitToPrenda_B_fkey" FOREIGN KEY ("B") REFERENCES "prendas" ("id_prenda") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_OutfitToPrenda_AB_unique" ON "_OutfitToPrenda"("A", "B");

-- CreateIndex
CREATE INDEX "_OutfitToPrenda_B_index" ON "_OutfitToPrenda"("B");
