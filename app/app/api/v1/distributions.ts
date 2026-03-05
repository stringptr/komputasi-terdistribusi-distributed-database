import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { store, produk, distribusi, aliasedTable } from '@/lib/db/schema';

const storeAsal = aliasedTable(store, 'sa');
const storeTujuan = aliasedTable(store, 'st');

export async function GET() {
  const result = await db
    .select({
      'Toko Awal': storeAsal.namaStore,
      'Toko Tujuan': storeTujuan.namaStore,
      'Nama Produk': produk.namaProduk,
    })
    .from(distribusi)
    .innerJoin(storeAsal, eq(storeAsal.idStore, distribusi.idAsal))
    .innerJoin(storeTujuan, eq(storeTujuan.idStore, distribusi.idTujuan))
    .innerJoin(produk, eq(produk.idProduk, distribusi.idProduk));

  return NextResponse.json(result);
}
