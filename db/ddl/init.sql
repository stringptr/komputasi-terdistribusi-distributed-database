CREATE DATABASE STORE;

-- TABLE STORE
CREATE TABLE STORE.Store (
    id_store INT PRIMARY KEY,
    nama_store TEXT
);

-- TABLE PRODUK
CREATE TABLE STORE.Produk (
    id_produk INT PRIMARY KEY,
    nama_produk TEXT,
    stok INT,
    id_store INT
);

-- TABLE DISTRIBUSI
CREATE TABLE STORE.Distribusi (
    id_distribusi INT PRIMARY KEY,
    id_asal INT,
    id_tujuan INT,
    id_produk INT
);

-- INSERT STORE
INSERT INTO Store VALUES
                      (1,'Toko Elektronik Anin'),
                      (2,'Toko Komputer Yuda'),
                      (3,'Toko Printing Satria'),
                      (4,'Toko Perkakas Vio'),
                      (5,'Toko Alat Tulis Yoeke');

-- INSERT PRODUK
INSERT INTO Produk VALUES
                       (1,'Laptop Asus',10,1),
                       (2,'Mouse Logitech',20,1),
                       (3,'Keyboard Mechanical',15,2),
                       (4,'Monitor Samsung',8,2),
                       (5,'Printer Canon',5,3),
                       (6,'Scanner Epson',7,3),
                       (7,'Obeng',40,4),
                       (8,'Palu',12,4),
                       (9,'Pensil',9,5),
                       (10,'Penghapus',50,5);

-- INSERT DISTRIBUSI
INSERT INTO Distribusi VALUES
                           (1, 1, 2, 1),
                           (2, 1, 2, 2),
                           (3, 1, 2, 3),
                           (4, 5, 1, 9),
                           (5, 5, 1, 10),
                           (6, 2, 3, 4),
                           (7, 2, 3, 4),
                           (8, 2, 4, 3)

-- Distribusi Foreign Keys
ALTER TABLE STORE.Distribusi
    ADD CONSTRAINT FK_distribusi_asal
        FOREIGN KEY (id_asal)
            REFERENCES Store(id_store);

ALTER TABLE STORE.Distribusi
    ADD CONSTRAINT FK_distribusi_tujuan
        FOREIGN KEY (id_tujuan)
            REFERENCES Store(id_store);

ALTER TABLE STORE.Distribusi
    ADD CONSTRAINT FK_distribusi_produk
        FOREIGN KEY (id_produk)
            REFERENCES Produk(id_produk);
