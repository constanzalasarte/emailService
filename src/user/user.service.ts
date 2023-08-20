import { Injectable } from '@nestjs/common';
import { User } from "@prisma/client";
import { EmailDto } from "./emailDto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async sendEmail(userId: number, emailDto: EmailDto){
    const receiver = await this.prisma.user.findUnique({
      where: {
        email: emailDto.receiverEmail,
      },
    });
    console.log(receiver);
    console.log(userId);
    // verifica si el email del receiver existe
    const email = await this.prisma.email.create({
      data: {
        body: emailDto.body,
        senderId: userId,
        receiverId: receiver.id,
      },
    });
    return email;
  }
  async getStats(){
    const stats = await this.prisma.user.findMany({
      select: {
        email: true,
        emailsSent: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        email: 'desc',
      },
    });
    const fs = [];
    for (const stat of stats) {
      fs.push({
        email: stat.email,
        emails_sent: stat.emailsSent.length,
      });
    }
    return fs;
  }
}
