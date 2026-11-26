import bcrypt from 'bcrypt' 

export const Users = [
  {
    name: "timothy",
    // lastName: "sfreg",
    email: "timothy@gmail.com",
    password:await bcrypt.hash("timothy",10),
    dateOfBirth: "12/12/12",
    gender: "female",
    phoneNumber: "7453642634",
  },
  {
    name:"abdul",
    email:"abdul@gmail.com",
    password:await bcrypt.hash("abdul",10),
  }
];
