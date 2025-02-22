import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import mongoose from 'mongoose';
//import { Shop } from './shop.schema';


@Schema()

export class Auth extends Document{
    @Prop({type:String, required:true, unique:true, lowercase:true})
    email:string;

    @Prop({required:true})
    password:string;
    
    @Prop({type:String})
    resetPasswordToken: string | undefined;
    @Prop({type:Date, required:false})
    resetPasswordExpires: Date | undefined;
    @Prop({ type:String,  enum: ['customer', 'business'], default: 'customer' })
    role: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Shop' }] })
    shopId: Types.ObjectId[];


    @Prop({type:Date, default: Date.now})
    createdAt: Date

}

export const AuthSchema = SchemaFactory.createForClass(Auth)