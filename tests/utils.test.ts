export const randomEmail = () => {
  const ran = Math.random();
  return 'user' + ran + '@yopmail.com';
};
export const randomPhone = () => {
  return '0' + Math.floor(Math.random() * 900000000) + 100000000;
};
