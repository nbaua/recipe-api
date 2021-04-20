import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiInfo(): string {
    return '<div style="font-family:arial;border-radius:10px;background-color:#dedede;padding:1%;width:300px;text-align:center;position: absolute;top: 40%;left:40%"><h3 style="color:red">Access Denied</h3></div>';
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
