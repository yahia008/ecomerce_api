import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from 'src/schema/auth.schema';
import { CreateDto, ResetDto } from 'src/utils/create.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthmoduleService {

    constructor(@InjectModel(Auth.name) private AuthModel: Model<Auth>,
    private jwtService: JwtService,
    private mailservice:MailerService,
    private configService: ConfigService
){}


    async create(createDto:CreateDto):Promise<Auth>{

        try{

            const findUser = await this.AuthModel.findOne({email:createDto.email})
        if (findUser) {
            throw new Error("User already exists"); // Or return a response object
        }
        const hashedPassword = await bcrypt.hash(createDto.password, 12 )

        const newUser = new this.AuthModel( {
            ...createDto,
            password:hashedPassword
        });
        return await newUser.save();
        }
        
        catch(error){
            throw new InternalServerErrorException(error.message);
        }
        
    }

    async login(createDto:CreateDto):Promise<{ user: Auth; access_token: string }>{

        const findUser = await this.AuthModel.findOne({email:createDto.email})
        if (!findUser) throw new UnauthorizedException("Invalid email or password")

        const isPassword = await bcrypt.compare(createDto.password, findUser.password)
        if(!isPassword) throw new UnauthorizedException('"Invalid email or password"')
        
        const payload = {id:findUser._id, email:findUser.email}

        const access_token = await this.jwtService.signAsync(payload)

        //const  user = {findUser, access_token}

        return { user: findUser, access_token }
    }


    async forgot(resetDto:ResetDto, req:any):Promise<{ message: string }>{

        try{
            const user =await  this.AuthModel.findOne({email: resetDto.email})
            if(!user) throw new UnauthorizedException('user does not esist')
               const token = this.resetToken()
            const resetToken = crypto.createHash('sha256').update(token).digest('hex')

            await this.AuthModel.findByIdAndUpdate(user._id,{
                resetPasswordToken:resetToken,
                resetPasswordExpires:Date.now() + 3600000
            })

            await this.sendMail(resetDto, token, req)
            return { message: 'Password reset email sent successfully' };

        }catch(error)
                
        { 
            
            throw new InternalServerErrorException(error.message);
        }
    }

    
    private resetToken():string {
        const token = crypto.randomBytes(32).toString('hex')
        return token
    }

    private async sendMail(resetDto:ResetDto, token:string, req:any){
     
        try{
            const resetUrl = `${req.protocol}://${req.get('host')}/auth/${token}/resetpassword`;

            const message = `
            Hi ${resetDto.email},
            
            You requested a password reset. Click the link below to reset your password:
            
            ${resetUrl}
            
            If you did not request this, please ignore this email.
        `;
          await this.mailservice.sendMail({
            from:'yahyatijjani99@gmail.com',
            to:resetDto.email,
            subject: 'Password Reset Request',
            text:message
         })
        }catch(error){
            throw new InternalServerErrorException("Failed to send password reset email.");
        }
       
    }

    async reset(token:string, password:string):Promise<{message:string}> {
        const resetToken = crypto.createHash('sha256').update(token).digest('hex');
        
        const user = await this.AuthModel.findOne({
            resetPasswordToken:resetToken,
            resetPasswordExpires: { $gt: Date.now() }
        })
        if(!user) throw new UnauthorizedException('Invalid or expired token')
       const hashed = await bcrypt.hash(password, 12)
        user.password = hashed
        user.resetPasswordToken = undefined; // Clear the reset token
        user.resetPasswordExpires = undefined;
        await user.save()
        return {message:'password reset succesfully'}
    }
}