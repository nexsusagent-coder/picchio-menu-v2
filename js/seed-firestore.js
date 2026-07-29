// ═══════════════════════════════════════════════════════
//   PICCHIO QR MENU — SEED-FIRESTORE.JS
//   Uploads local menu-data.js into Firebase Firestore
// ═══════════════════════════════════════════════════════

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Check command line arguments
const serviceAccountPath = process.argv[2];
if (!serviceAccountPath) {
  console.log("==========================================================");
  console.log("   Picchio Firestore Seeding Script");
  console.log("==========================================================");
  console.log("Usage: node seed-firestore.js <path-to-service-account-key.json>");
  console.log("");
  console.log("How to get your service account key:");
  console.log("1. Go to Firebase Console -> Project Settings -> Service Accounts");
  console.log("2. Click 'Generate new private key' and download the JSON file");
  console.log("3. Run this script passing the path to the downloaded JSON file");
  console.log("==========================================================");
  process.exit(1);
}

const serviceAccount = require(path.resolve(serviceAccountPath));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Load menu data using Node VM context
const menuDataPath = path.join(__dirname, 'menu-data.js');
const menuDataCode = fs.readFileSync(menuDataPath, 'utf8');
const sandbox = {};
try {
  vm.runInNewContext(menuDataCode, sandbox);
} catch (e) {
  console.error("Error parsing menu-data.js:", e);
  process.exit(1);
}

const menuData = sandbox.MENU_DATA;
if (!menuData || !menuData.categories || !menuData.items) {
  console.error("MENU_DATA structure is invalid or not found in menu-data.js.");
  process.exit(1);
}

async function seed() {
  console.log("Seeding Firestore database with Picchio Menu Data...");
  
  const docRef = db.collection('menu').doc('data');
  await docRef.set(menuData);
  
  console.log("\n==========================================================");
  console.log(" SUCCESS: Firestore menu successfully populated!");
  console.log(" Document path: 'menu/data'");
  console.log("==========================================================");
}

seed().catch(err => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
