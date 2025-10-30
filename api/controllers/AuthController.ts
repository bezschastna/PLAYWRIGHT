import { APIRequestContext, expect } from '@playwright/test';

export class AuthController {

    request: APIRequestContext;
    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async signIn(email: string, password: string) {

        let sid: string;

        const responseAuth = await this.request.post('api/auth/signin', {
            data: {
                email: email,
                password: password,
                remember: false
            }
        });
        const cookieHeader = responseAuth.headers()['set-cookie'];
        sid = cookieHeader.split(';')[0];
        expect(sid).toContain('sid=');
        console.log('SID cookie:', sid);
        return sid;
    }
}