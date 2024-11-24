import { UserRepository } from "./repository/users"
import { AuthRepo } from "./repository/auth";
import { PasswordHasher } from "./passwordHasher";
import { AuthService } from "./service/auth";

const repo = new AuthRepo;
const hasher = new PasswordHasher;
const service = new AuthService(repo, hasher);

const res = service.authenticate("fnorris", "F4HNd");
res.then((value) => { console.log(value); });

// const pass = "F4HNd";
// hasher.generateHash(pass).then((value) => { console.log(pass); console.log(value); hasher.checkPassword(pass, value).then((value) => { console.log(value); }) })
