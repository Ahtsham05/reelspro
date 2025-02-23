import React, { useState } from 'react'
import { IKUpload } from 'imagekitio-next';
import { IKUploadResponse } from 'imagekitio-next/dist/types/components/IKUpload/props';

interface FileUploadProps {
  // Add your props here
  onProgress? : (progress : number) => void;
  onSuccess : (res : IKUploadResponse) => void;
  fileType? : "image" | "video";
}

const FileUpload = ({onProgress , onSuccess , fileType = "image"} : FileUploadProps) => {

    const [uploading , setUploading] = useState<Boolean>(false);
    const [error, setError] = useState<string | null>(null)

    const onUploadStart = () => {
      setUploading(true)
      setError(null)
    };
    
    const handleProgress = (progress : ProgressEvent) => {
      if(progress.lengthComputable && onProgress){
        const percentComplete = (progress.loaded / progress.total) * 100;
        onProgress(Math.round(percentComplete))
      }
    };
    
    const handleSuccess = (res : IKUploadResponse) => {
      onSuccess(res)
      setUploading(false)
    };
    
    const onError = (err : {message : string}) => {
      setUploading(false)
      setError(null)
      setError(err.message)
    };

    const validateFile = (file : File) => {
      if(fileType === "video"){
        if(!file.type.startsWith('video/')){
          setError("Invalid file type. Only video files are allowed.")
          return false
        }
        if(file.size > 100 * 1024 * 1024){
          setError("File size exceeds the limit of 100MB.")
          return false
        }
      }else{
        const validTypes = ["image/jpeg", "image/png", "image/webp"]
        if(!validTypes.includes(file.type)){
          setError("Invalid file type. Only image files are allowed.")
          return false
        }
        if(file.size > 5 * 1024 * 1024){
          setError("File size exceeds the limit of 5MB.")
          return false
        }
      }
      return true
    }

  return (
    <div>
        <IKUpload
          fileName="test-upload.jpg"
          tags={["sample-tag1", "sample-tag2"]}
          useUniqueFileName={true}
          responseFields={["tags"]}
          validateFile={validateFile}
          folder={"/reelspro"}
          onError={onError}
          onSuccess={handleSuccess}
          onUploadProgress={handleProgress}
          onUploadStart={onUploadStart}
        />
    </div>
  )
}

export default FileUpload