import { UserRepository } from "./repository/users"

const repo = new UserRepository;
const res = repo.readAll(3, 302);
res.then((value) => { console.log(value); });
