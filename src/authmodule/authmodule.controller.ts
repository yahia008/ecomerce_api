import { Controller, Post, Get, Body, Request, UseGuards, Param, BadRequestException, Patch } from '@nestjs/common';
import { AuthmoduleService } from './authmodule.service';
import { CreateDto, ResetDto } from 'src/utils/create.dto';
import { AuthGuard } from 'src/auth/auth.guard';



@Controller('auth')
export class AuthmoduleController {

    constructor(private readonly authService :AuthmoduleService ){}

    @Post('signin')
    async signin(@Body() createDto:CreateDto):Promise<any>{
        return await this.authService.create(createDto)
    }

    @Post('login')
    async login(@Body() createDto:CreateDto):Promise<any>{
        return await this.authService.login(createDto)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }

    @Post('forgotpassword')
    async forgotPassword(@Body() resetDto:ResetDto, @Request() req):Promise<any>{
        return await this.authService.forgot(resetDto, req)
    }

    @Patch(':token/resetpassword')
    async resetPassword(@Body() resetDto:ResetDto, @Param('token') token):Promise<any>{
        if (!token || !resetDto.password) {
            throw new BadRequestException('Token and password are required');
        }
        
        return await this.authService.reset(token, resetDto.password)
    }
    

}
