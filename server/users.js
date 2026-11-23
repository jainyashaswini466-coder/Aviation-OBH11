import bcrypt from 'bcrypt' 

export const Users = [
  {
    firstName: "dwefrty",
    lastName: "sfreg",
    email: "dfvebr@sgrs.com",
    password:await bcrypt.hash("qfgrwgqg",10),
    dateOfBirth: "12/12/12",
    gender: "female",
    phoneNumber: "7453642634",
  },
];
