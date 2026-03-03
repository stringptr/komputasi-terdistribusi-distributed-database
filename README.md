# Distributed Redundant Database Project

**Next.js + Bun + YugabyteDB (3-Node Cluster over ZeroTier)**

## 1. Project Overview

This project demonstrates a **High-Availability (HA) Distributed Database** system. We are using **YugabyteDB** to prove how data can be automatically synchronized and duplicated across multiple physical machines (devices) to ensure zero data loss and zero downtime, even if one machine disconnects.

### Key Features

* **Replication Factor (RF=3):** Data is "triplicated" across 3 nodes.
* **Automatic Sharding:** Data is partitioned across nodes to balance the load.
* **Fault Tolerance:** The application remains fully functional if any single device fails.
* **Smart Routing:** Using the YugabyteDB Smart Driver to handle node-aware connections.

---

## 2. Infrastructure Requirements

* **3 Devices** (Windows/macOS/Linux) running Docker Desktop.
* **ZeroTier (or other tunnel):** All devices must be joined to the same ZeroTier (or other tunnel) network.

### Technical Stack

* Container: Docker
* Database: YugabyteDB (PostgreSQL-compatible, Distributed SQL)
* Framework: Next.js (App Router)
* Runtime: Bun
* ORM: Drizzle ORM
* Driver: @yugabytedb/pg (Node.js Smart Driver for cluster-aware routing)
* Networking: ZeroTier (Virtual Tunnel)

---

## 3. Network Configuration (Crucial)

Each member must find their **ZeroTier IP** (e.g., `10.147.17.x`).

### Windows Firewall Setup

Run this in **PowerShell as Administrator** on all Windows devices to allow the nodes to talk to each other:

```powershell
$ports = @(5433, 7000, 7100, 9000, 9100, 15433)
foreach ($port in $ports) {
    New-NetFirewallRule -DisplayName "YugabyteDB Port $port" -Direction Inbound -LocalPort $port -Protocol TCP -Action Allow
}
```

---

## 4. Local Setup

1. **Clone the Repository:**

```bash
git clone git@github.com:stringptr/komputasi-terdistribusi-distributed-database
cd komputasi-terdistribusi-distributed-database
```

2. **Create your `.env` file:**
Create a `.env` file in the root directory.
**Note:** `LEADER_IP` must be the ZeroTier IP of **Device 1** for everyone.

```bash
# Your device's ZeroTier IP
MY_IP=10.147.x.x 

# Device 1's ZeroTier IP (The "Seed" node)
LEADER_IP=10.147.x.11 
```

3. **Start the Services:**

Depending on your device's assigned role, run the corresponding command:

**On Database Devices**

```bash
docker -f compose.dev.yaml --profile db up -d
```

**On Application Devices**

```bash
docker -f compose.dev.yaml --profile app up -d
```

---

## 5. Development Details

### Database Connection

The Next.js app connects to the **local** Yugabyte node. The nodes then handle the synchronization between devices.

* **Database URL:** `postgres://yugabyte@{NODE_IP(s)}:5433/yugabyte`
* **Driver:** `@yugabytedb/pg` (Smart Driver)
* **ORM:** Drizzle

---

## 6. Verification & Demo

### UI Dashboards

You can monitor the cluster health by visiting these URLs in your browser:

* **Master UI:** `http://localhost:7000` (See all nodes and their status)
* **Tablet Server UI:** `http://localhost:9000` (See data sharding details)

### Demo Test

1. Open the app on Device 2 and Device 3.
2. Add some data.
3. **Physically disconnect Device 1** from the network.
4. Observe that Device 2 and 3 can still read/write data perfectly.
5. Reconnect Device 1 and watch it automatically re-sync the missed data via the UI.

---

## 7. Project Structure

```text
project/
├── app/                    # Next.js Source Code
│   ├── app/                # App Router (Routes & Server Components)
│   ├── lib/                # Core Infrastructure (DB Connection, Schema)
│   ├── services/           # Service Layer (Business Logic & Retries)
│   ├── repositories/       # Repository Layer (Raw Drizzle Queries)
│   ├── utils/              # Helper functions
│   ├── middleware.ts       # Next.js Auth/Validation Middleware
│   ├── Dockerfile          # Multi-stage build for the app
│   └── ...
├── db/                     # Database schema and migrations
│   ├── migration.sql       # Database schema definition
│   └── seed.sql            # Database initial seed
├── .env                    # Local network config (Git ignored)
└── compose.yaml            # Unified orchestration file
```
