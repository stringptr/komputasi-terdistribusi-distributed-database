import { NextResponse } from 'next/server';
import { eq, aliasedTable, asc } from 'drizzle-orm';
import { db } from '@/lib/db/db';
import { store, produk, distribusi } from '@/lib/db/schema';

const storeAsal = aliasedTable(store, 'sa');
const storeTujuan = aliasedTable(store, 'st');

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tableName = searchParams.get('table');

  try {
    let result;

    if (tableName === 'store') {
      result = await db
        .select()
        .from(store)
        .orderBy(asc(store.idStore));

    } else if (tableName === 'produk') {
      result = await db
        .select()
        .from(produk)
        .orderBy(asc(produk.idProduk));

    } else {
      result = await db
        .select({
          id_distribusi: distribusi.idDistribusi,
          'Toko Asal': storeAsal.namaStore,
          'Toko Tujuan': storeTujuan.namaStore,
          'Nama Produk': produk.namaProduk,
        })
        .from(distribusi)
        .innerJoin(storeAsal, eq(storeAsal.idStore, distribusi.idAsal))
        .innerJoin(storeTujuan, eq(storeTujuan.idStore, distribusi.idTujuan))
        .innerJoin(produk, eq(produk.idProduk, distribusi.idProduk))
        .orderBy(asc(distribusi.idDistribusi)); // Sort by id_distribusi
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
