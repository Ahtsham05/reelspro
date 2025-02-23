import React from "react";
import { ImageKitProvider, IKImage } from "imagekitio-next";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

const Providers = ({children} : {children : React.ReactNode}) => {
    const authenticator = async () => {
        try {
          const response = await fetch("/api/auth/imagekit-auth");
      
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
          }
      
          const data = await response.json();
          const { signature, expire, token } = data;
          return { signature, expire, token };
        } catch (error : any) {
          throw new Error(`Authentication request failed: ${error.message}`);
        }
    };
  return (
    <ImageKitProvider urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>{children}</ImageKitProvider>
  )
}

export default Providers