import { TOKEN_SECRET } from "@/config/env";
import authQueries from "@/queries/auth";
import { generateJwtToken } from "@/utils/generateJwtToken";
import bcrypt from "bcryptjs";

class AuthService {
    public async handleLogin(email: string, password: string) {
        const { employee_id: employeeId, email: storedEmail, password_hash: storedPasswordHash } = await authQueries.login(email);
        if (!storedEmail || !storedPasswordHash) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, storedPasswordHash);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        const token = generateJwtToken(employeeId.toString(), TOKEN_SECRET as string, "1d");
        return { token };
    }
}

export default new AuthService();
