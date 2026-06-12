-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "zona" TEXT,
    "estilo_ropa" TEXT,
    "preferencias_colores" TEXT,
    "talle" TEXT,
    "foto_perfil" TEXT DEFAULT '/default-avatar.png',
    "reputacion" REAL DEFAULT 0,
    "preferencias_completadas" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "prendas" (
    "id_prenda" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "temporada" TEXT,
    "marca" TEXT,
    "talle" TEXT,
    "imagen_url" TEXT,
    "descripcion" TEXT,
    "fecha_venta" DATETIME,
    "precio" REAL,
    "descuento" REAL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    CONSTRAINT "prendas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "outfits" (
    "id_output" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "clima" TEXT,
    "ocasion" TEXT,
    "fecha_creacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    CONSTRAINT "outfits_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
