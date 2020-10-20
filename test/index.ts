import {config} from "dotenv";
import {resolve} from "path";
import {firebase} from "../src/FirebaseImport";
import {TestDatabase} from "../sample_db/TestDatabase";

config({path: resolve(__dirname, "../.env")});
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    appId: process.env.FIREBASE_APP_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = new TestDatabase(firebase.firestore());
