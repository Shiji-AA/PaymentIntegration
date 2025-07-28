import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import { Juspay } from 'expresscheckout-nodejs';

const juspay = new Juspay({
  merchantId: process.env.MERCHANT_ID,
  baseUrl: "https://smartgatewayuat.hdfcbank.com", // Sandbox
  jweAuth: {
    keyId: process.env.KEY_UUID,
    publicKey: fs.readFileSync(process.env.PUBLIC_KEY_PATH,'utf8'),
    privateKey: fs.readFileSync(process.env.PRIVATE_KEY_PATH,'utf8')
  }
});

export default juspay;
