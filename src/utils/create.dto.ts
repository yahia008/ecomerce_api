import { ConfigService } from "@nestjs/config"

export class CreateDto{
    email:string
    password:string
}

export class ResetDto{
    email:string
    url?:string
    password?:string
}


