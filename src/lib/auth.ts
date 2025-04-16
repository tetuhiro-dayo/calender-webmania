import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export function getTokenPayload(token: string): { id: number; username: string } | null {
    try {
        const payload = jwt.verify(token, JWT_SECRET) as { id: number; username: string };
        return payload;
    } catch {
        return null;
    }
}
