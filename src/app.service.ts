import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const content = `<div style="position: absolute;  margin: auto;  top: 0;  right: 0;  bottom: 0;  left: 0;  width: 80%;  height: 120px;  background-color: #ccc;  border-radius: 5px; font-family:'calibri';font-size:18px; text-align:center;vertical-align: middle">
        <div style="margin:25px;">You need to have a valid license key to access these end-points, If you have obtained them, supply them as bearer tokens within the request. If you're experiencing any issues contact admin@apimasters.com</div>
      </div>`;
    return content;
  }
}
