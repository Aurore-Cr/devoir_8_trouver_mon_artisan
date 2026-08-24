-- ============================================================
-- Trouve ton artisan - Script de création de la base de données
-- ============================================================

CREATE DATABASE IF NOT EXISTS trouve_ton_artisan
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE trouve_ton_artisan;

-- Table des catégories (ex: Bâtiment, Services, Fabrication, Alimentation)
CREATE TABLE IF NOT EXISTS categorie (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- Table des spécialités (ex: Boucher, Electricien...)
-- Une spécialité est rattachée à une seule catégorie
CREATE TABLE IF NOT EXISTS specialite (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50) NOT NULL,
  categorie_id INT NOT NULL,
  CONSTRAINT fk_specialite_categorie
    FOREIGN KEY (categorie_id) REFERENCES categorie(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Table des artisans
-- Un artisan apparaît dans une seule spécialité
CREATE TABLE IF NOT EXISTS artisan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(150) NOT NULL,
  note DECIMAL(2,1) NOT NULL DEFAULT 0,
  ville VARCHAR(100) NOT NULL,
  a_propos TEXT,
  email VARCHAR(150) NOT NULL,
  site_web VARCHAR(255) DEFAULT NULL,
  image VARCHAR(255) DEFAULT NULL,
  top TINYINT(1) NOT NULL DEFAULT 0,
  specialite_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_artisan_specialite
    FOREIGN KEY (specialite_id) REFERENCES specialite(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Index utiles pour la recherche par nom et le filtre par catégorie
CREATE INDEX idx_artisan_nom ON artisan(nom);
CREATE INDEX idx_specialite_categorie ON specialite(categorie_id);
