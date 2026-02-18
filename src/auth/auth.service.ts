import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }


    async register(body: any) {

        const password = body.password;
        const hashedPassword = await bcrypt.hash(password, 10);

        return this.prisma.user.create({
            data: {
                ...body,
                password: hashedPassword
            }
        })
    }

    async login(body: any) {

        const user = await this.prisma.user.findUnique({
            where: {
                email: body.email
            }
        })

        if (!user) {
            throw new NotFoundException('User not found')
        }

        const isPasswordMatch = await bcrypt.compare(body.password, user.password)

        if (!isPasswordMatch) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const token = this.jwtService.sign({ id: user.id })

        return { token, message: 'Login successful' }
    }
}
