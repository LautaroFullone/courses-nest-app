import * as bcrypt from "bcryptjs"

const salt = 10; //categoria de encriptacion

async function generateHash(passwordPlain: string): Promise<string> {
    const hash = await bcrypt.hash(passwordPlain, salt)
    return hash;
}

async function compareHash(plain: string, hash: string): Promise<any>{
    return await bcrypt.compare(plain, hash);
}

export { generateHash, compareHash } 