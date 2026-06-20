-- CreateTable
CREATE TABLE "_OutfitToPrenda" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_OutfitToPrenda_A_fkey" FOREIGN KEY ("A") REFERENCES "outfits" ("id_output") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_OutfitToPrenda_B_fkey" FOREIGN KEY ("B") REFERENCES "prendas" ("id_prenda") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_OutfitToPrenda_AB_unique" ON "_OutfitToPrenda"("A", "B");

-- CreateIndex
CREATE INDEX "_OutfitToPrenda_B_index" ON "_OutfitToPrenda"("B");
