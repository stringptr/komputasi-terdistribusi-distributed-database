'use client';

import { useState, useEffect } from 'react';

type DataRow = Record<string, any>;

export default function DatabaseViewer() {
  const [activeDb, setActiveDb] = useState<number>(1);
  const [activeTable, setActiveTable] = useState<string>('Store');
  const [data, setData] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // panggil data
  const fetchData = async (dbNumber: number, tableName: string) => {
    setLoading(true);
    setActiveDb(dbNumber);
    setActiveTable(tableName);

    try {
      // AKTIFIN
      // const response = await fetch(`/api/query?db=${dbNumber}&table=${tableName}`);
      // const result = await response.json();
      // setData(result);

      // DATA DUMMY BES
      setTimeout(() => {
        let dummyData: DataRow[] = [];
        
        if (tableName === 'Store') {
          dummyData = [
            { id_store: 1, nama_store: `Store Elektronik Anin (Dari DB ${dbNumber})` },
            { id_store: 2, nama_store: `Store Komputer Yudha (Dari DB ${dbNumber})` },
            { id_store: 3, nama_store: `Store Printing Satria (Dari DB ${dbNumber})` }
          ];
        } else if (tableName === 'Produk') {
          dummyData = [
            { id_produk: 1, nama_produk: `Laptop Asus`, stok: 10, id_store: 1 },
            { id_produk: 2, nama_produk: `Mouse Logitech`, stok: 20, id_store: 1 },
            { id_produk: 3, nama_produk: `Keyboard Mechanical`, stok: 15, id_store: 2 }
          ];
        } else if (tableName === 'Distribusi') {
          dummyData = [
            { id_distribusi: 1, id_produk: 1, store_tujuan: `Store Komputer Yudha` },
            { id_distribusi: 2, id_produk: 2, store_tujuan: `Store Printing Satria` }
          ];
        }

        setData(dummyData);
        setLoading(false);
      }, 400);

    } catch (error) {
      console.error("Gagal mengambil data:", error);
      setLoading(false);
    }
  };

  // tampil DB 1 dan Tabel Store saat pertama kali dibuka
  useEffect(() => {
    fetchData(1, 'Store');
  }, []);

  const tableHeaders = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-black font-sans">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-pink-600 from-30% to-purple-500 bg-clip-text text-transparent">
          KOMPUTASI TERDISTRIBUSI: STORE DATABASE
        </h1>
        
        {/*Pilih Database */}
        <div className="flex justify-center gap-4 mb-6">
          <span className="py-2 font-semibold text-gray-500">Pilih Database:</span>
          {[1, 2, 3].map((num) => (
            <button
              key={`db-${num}`}
              onClick={() => fetchData(num, activeTable)}
              className={`px-5 py-2 rounded-md font-bold transition-all ${
                activeDb === num 
                  ? 'bg-pink-600 text-white shadow-md transform scale-105' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Database {num}
            </button>
          ))}
        </div>

        {/*Pilih Tabel*/}
        <div className="flex justify-center gap-3 mb-8 pb-6 border-b border-gray-200">
          <span className="py-2 font-semibold text-gray-500">Pilih Tabel:</span>
          {['Store', 'Produk', 'Distribusi'].map((tab) => (
            <button
              key={`tab-${tab}`}
              onClick={() => fetchData(activeDb, tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeTable === tab 
                  ? 'bg-pink-100 text-pink-700 border border-pink-300' 
                  : 'bg-white text-gray-500 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Tabel {tab}
            </button>
          ))}
        </div>

        {/* AREA TABEL */}
        <div className="overflow-hidden border border-pink-200 rounded-lg shadow-sm">
          {loading ? (
            <div className="p-12 text-center text-gray-500 animate-pulse font-medium">
              Menarik data dari Database {activeDb}...
            </div>
          ) : data.length > 0 ? (
            <table className="w-full text-left border-collapse bg-white">
              <thead className="bg-pink-600 text-white">
                <tr>
                  {tableHeaders.map((header) => (
                    <th key={header} className="p-4 font-semibold uppercase tracking-wider text-xs">
                      {header.replace(/_/g, ' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-blue-50 transition-colors">
                    {tableHeaders.map((header) => (
                      <td key={`${rowIndex}-${header}`} className="p-4 text-sm text-gray-700">
                        {row[header]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center text-gray-500">Yaah, datanya gak ada...</div>
          )}
        </div>

      </div>
    </div>
  );
}