import 'dotenv/config';
import { db, client } from '@/lib/db/db'

export async function testCluster() {
  try {
    if (!client._connected) await client.connect();

    const allNodes = await client.query("SELECT * FROM yb_servers()");

    console.log("✅ Query successful!");
    console.table(allNodes.rows);

    return allNodes.rows;
  } catch (err) {
    console.error("❌ Connection failed!", err);
    return { error: err.message };
  }
}
