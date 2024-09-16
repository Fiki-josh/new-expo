import * as SQLite from "expo-sqlite";
import { LoginResponse, RegisterResponse, ReturnedUser } from "../types";

const dbPromise = async () => await SQLite.openDatabaseAsync("userDB.db");

export const setupDatabase = async () => {
  const db = await dbPromise();

  try {
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT
          );`
    );

    console.log("Table Created")
  } catch (error) {
    console.log("Table not Created: ", error )
  }
};


export const registerUser = async(name:string, email: string, password: string): Promise<RegisterResponse> => {
    const db = await dbPromise();

    try {
        const result = await db.runAsync(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, password])

        if(result.changes) return {isError: false, message: "User created successfully", isSuccess: true}

        return {isError: true, message: "Something went wrong", isSuccess: false}
    } catch (error: any ) {
        console.log(error.message)

        return {isError: true, message: error.message, isSuccess: false}
    }
}

export const loginUser = async( email: string, password: string): Promise<LoginResponse> => {
    const db = await dbPromise();

    try {
        const resultArr: ReturnedUser[] = await db.getAllAsync(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password])

        if(resultArr.length > 0) return {isError: false, message: `Welcome ${resultArr[0].name}`, isSuccess: true, data: resultArr[0]}

        return {isError: true, message: "Something went wrong", isSuccess: false}
    } catch (error: any ) {
        console.log(error.message)

        return {isError: true, message: error.message, isSuccess: false}
    }
}
