import { Body, Controller, ForbiddenException, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { EmailDto } from './emailDto';
import { UserService } from './user.service';
import { Email, User } from "@prisma/client";
import { GetUser } from "../auth/decorator";

@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('sendEmail')
  async sendEmail(
    @GetUser('id') userId: number,
    @Body() emailDto: EmailDto,
  ) {
    console.log({ req: userId });
    return this.service.sendEmail(userId, emailDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('getStats')
  async getStats(@GetUser() user: User) {
    console.log(user);
    if (user.role === "ADMIN"){
      return this.service.getStats();
    }
    throw new ForbiddenException('You are not an admin');
  }
}
