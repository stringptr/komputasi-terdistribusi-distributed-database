import { testCluster } from "@/lib/db/test"

export default async function Home() {
  const results = await testCluster();

  return (
    <main>
      <h1>Check your Terminal for the Node Table!</h1>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </main>
  );
}
