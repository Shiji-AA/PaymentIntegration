import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import { Juspay } from 'expresscheckout-nodejs';

//console.log('PRIVATE_KEY_PATH from env:', process.env.PRIVATE_KEY_PATH);
//console.log('Exists:', fs.existsSync(process.env.PRIVATE_KEY_PATH));

const juspay = new Juspay({
  merchantId: process.env.MERCHANT_ID,
  baseUrl: "https://smartgateway.hdfcbank.com",
  jweAuth: {
    keyId: process.env.KEY_UUID,
    publicKey: fs.readFileSync(process.env.PUBLIC_KEY_PATH,'utf8'),
    privateKey: fs.readFileSync(process.env.PRIVATE_KEY_PATH,'utf8') 
 }
});

export default juspay;
