export type TUser = {
  accountData: {
    username: string;
    passwordHash: string;
    email: string;
  };
};

export type TUserWithId = TUser & { _id: string };

export type TUsers = TUser[];

export type TTempUser = {
  username: string;
  email: string;
  password: string;
  verificationCode: string;
  codeExpiresAt: number;
};
