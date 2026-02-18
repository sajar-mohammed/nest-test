import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
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
