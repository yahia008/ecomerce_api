// import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
// import { Document, Types } from "mongoose";
// import mongoose from "mongoose";
// import { Auth } from "./auth.schema";

// @Schema({ timestamps: true })

// export class Shop extends Document {

//     @Prop({ type: Types.ObjectId, ref: 'Auth', required: true }) 
//     userId: Types.ObjectId;

//     @Prop({required:true})
//     email: String;

//     @Prop({required:true})
//     businessname: String;

//     @Prop({default:'No description'})
//     description: String;

//     @Prop({enum:['fashion', 'electronics', 'grocery', 'beauty', 'others']})
//     category: String;

//     @Prop({ type: String, trim: true })    
//     phone: String;

//     @Prop()
//     address: String;

//     @Prop()
//     country: String;

//     @Prop()
//     city:  String;

//     @Prop({default:''})
//     logo:  String; // URL to shop logo

//     @Prop({default:''})
//     coverImage: String; // URL to shop banner

//     @Prop({default:false})
//     isActive: Boolean;

//     @Prop({default:0})
//     rating: Number;

//     @Prop({default:0})
//     salesCount: Number;
// ; // Automatically adds `createdAt` & `updatedAt`

// }

// export const ShopSchema = SchemaFactory.createForClass(Shop)