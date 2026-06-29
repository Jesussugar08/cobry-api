import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import  s3Client  from "../middleware/s3";
import {Request, Response} from "express"


const getPresignedUrl = async (req: Request, res: Response) =>{
    
    const {fileName, fileType} = req.body
        try{

            const command = new PutObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME!,
                Key: fileName,
                ContentType: fileType
            })
            const url = await getSignedUrl(s3Client, command, {expiresIn: 300})
            res.status(200).json({url})

        }catch(error){
            res.status(500).json({error: error.message})
        }
}

export {getPresignedUrl}