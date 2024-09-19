import { Cloudinary } from "@cloudinary/url-gen";
import { upload } from "cloudinary-react-native";
import { UploadApiResponse } from "cloudinary-react-native/lib/typescript/src/api/upload/model/params/upload-params";

export const cld = new Cloudinary({
    cloud: {
        cloudName: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME,
    }
});

export  const uploadImage = async (file:string) => {
      
                     
    const options = {
       upload_preset: 'default',
       unsigned: true,
        }

    return new Promise<UploadApiResponse>(async(resolve, reject) => {
    
       await upload(cld,
             {file, 
          options: options,
           callback: (error: any, response: any) => {
             if (error || !response){
                reject(error)
             }else {
                resolve(response)
             }
             
          //.. handle response
    }})
    })
 }
