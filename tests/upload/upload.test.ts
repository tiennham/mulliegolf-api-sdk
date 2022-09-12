// import { expect } from 'chai';
// import { describe, it } from 'mocha';

// import { api, userEmail, pwd, testEmail, getAuthToken } from '../config.test';

describe('upload S3 test', () => {
  // it('should logged in', async () => {
  //     const r: any = await api.auth.login("tuan@example.com", "123456@aA");
  //     const user = await api.user.me();
  //     console.log(user)
  //     console.log(r)
  // });
  // it('should get preSigned URL', async () => {
  //     const r: any = await api.uploadS3.createpreSignedUrl({
  //         list_file_info: [{
  //             file_name: "image1.jpeg",
  //             file_type: ".jpeg",
  //             folder_name: "test"
  //         }]
  //     });
  //     console.log(r)
  // });
  // it('should have Auth Header', async () => {
  //   const h = await api.auth.getAuthHeader();
  //   expect(h).not.empty;
  // });
  // it('should isAuthenticated work', async () => {
  //   const b = await api.auth.isAuthenticated();
  //   expect(b).true;
  // });
  // it('should getAuthorizationHeaders valid', async () => {
  //   const h = await api.auth.getAuthorizationHeaders();
  //   expect(h?.Authorization).not.empty;
  // });
  // it('should changePassword work', async () => {
  //   const oldPassword = pwd;
  //   const newPassword = '123123@aA';
  //   await api.auth.changePassword(oldPassword, newPassword);
  //   const r: any = await api.auth.login(userEmail, newPassword);
  //   await api.auth.changePassword(newPassword, oldPassword);
  //   expect(getAuthToken(r)).not.empty;
  // });
  // it('should resetPassword work', async () => {
  //   const r: any = await api.auth.resetPassword(testEmail);
  //   expect(r?.detail).include('Password reset e-mail has been sent');
  // });
  // it('should resendEmail work', async () => {
  //   const r: any = await api.auth.resendEmail(testEmail);
  //   console.log('2222', r);
  // expect(r?.detail).include('Password reset e-mail has been sent');
  // });
  // it('should register work', async () => {
  //   const ran = Math.random();
  //   const ranEmail = 'user' + ran + '@yopmail.com';
  //   const params = {
  //     username: 'user' + ran,
  //     email: ranEmail,
  //     password1: '123123@aA',
  //     password2: '123123@aA',
  //     first_name: 'test',
  //     last_name: ran + '',
  //   };
  //   const r: any = await api.auth.register(params);
  //   expect(r?.email).equal(ranEmail);
  // });
  // // move to end
  // it('should set new token', async () => {
  //   const data = {
  //     access: 'testing',
  //   };
  //   await api.auth.setAuthToken(data);
  //   const t = await api.auth.getAuthToken();
  //   expect(t?.access_token).equal(data?.access);
  // });
  // it('should Logout', async () => {
  //   await api.auth.logout();
  //   const t = api.auth.getAuthToken();
  //   expect(t).empty;
  // });
});
