import { pgTable, integer, text, foreignKey } from 'drizzle-orm/pg-core';

export const store = pgTable('store', {
  idStore: integer('id_store').primaryKey(),
  namaStore: text('nama_store'),
});

export const produk = pgTable('produk', {
  idProduk: integer('id_produk').primaryKey(),
  namaProduk: text('nama_produk'),
  stok: integer('stok'),
  idStore: integer('id_store'),
}, (table) => ({
  fkProdukStore: foreignKey({
    columns: [table.idStore],
    foreignColumns: [store.idStore],
  }),
}));

export const distribusi = pgTable('distribusi', {
  idDistribusi: integer('id_distribusi').primaryKey(),
  idAsal: integer('id_asal'),
  idTujuan: integer('id_tujuan'),
  idProduk: integer('id_produk'),
}, (table) => ({
  fkDistribusiAsal: foreignKey({
    columns: [table.idAsal],
    foreignColumns: [store.idStore],
  }),
  fkDistribusiTujuan: foreignKey({
    columns: [table.idTujuan],
    foreignColumns: [store.idStore],
  }),
  fkDistribusiProduk: foreignKey({
    columns: [table.idProduk],
    foreignColumns: [produk.idProduk],
  }),
}));
