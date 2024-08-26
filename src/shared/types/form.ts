interface DataFormLogin {
  email: string;
  password: string;
}

interface DataFormRegister extends DataFormLogin {
  name: string;
}

export { type DataFormRegister, type DataFormLogin };
