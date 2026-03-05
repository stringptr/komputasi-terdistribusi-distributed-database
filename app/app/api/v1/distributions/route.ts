import { NextResponse } from 'next/server';
import { eq, aliasedTable } from 'drizzle-orm';
import { db } from '@/lib/db/db';
import { store, produk, distribusi } from '@/lib/db/schema';

const storeAsal = aliasedTable(store, 'sa');
const storeTujuan = aliasedTable(store, 'st');

export async function GET() {
  console.log('[API] /api/v1/distributions - Request received');
  try {
    console.log('[API] Executing DB query...');
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
    
    console.log('[API] Query result:', result.length, 'rows');
    return NextResponse.json(result);
  } catch (error) {
    console.error('[API] DB Error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
