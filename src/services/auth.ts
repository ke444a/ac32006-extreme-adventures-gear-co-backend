import { TOKEN_SECRET } from "@/config/env";
import { getCredentialsByEmailQuery } from "@/queries/auth";
import { getEmployeeByIdQuery } from "@/queries/employees";
import { generateJwtToken } from "@/utils/generateJwtToken";
import bcrypt from "bcryptjs";

class AuthService {
    public async handleLogin(email: string, password: string) {
        const credentials = await getCredentialsByEmailQuery(email);
        if (!credentials) {
            throw new Error("Invalid credentials");
        }
        
        const { employee_id: employeeId, password_hash: storedPasswordHash } = credentials;
        const isPasswordValid = await bcrypt.compare(password, storedPasswordHash);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        const token = generateJwtToken(employeeId.toString(), TOKEN_SECRET as string, "1d");
        const employee = await getEmployeeByIdQuery(employeeId);
        return { token, employee };
    }
}

export default new AuthService();
