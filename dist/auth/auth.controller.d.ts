import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: any): Promise<{
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    login(body: any): Promise<{
        token: string;
        message: string;
    }>;
}
