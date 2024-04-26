declare namespace User {
  interface loginParams {
    username: string;
    passwd: string;
  }

  interface loginRes {
    username: string;
    token: string;
  }
}
