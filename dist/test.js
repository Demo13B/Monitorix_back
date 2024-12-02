"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./repository/auth");
const passwordHasher_1 = require("./passwordHasher");
const auth_2 = require("./service/auth");
const repo = new auth_1.AuthRepo;
const hasher = new passwordHasher_1.PasswordHasher;
const service = new auth_2.AuthService(repo, hasher);
const res = service.authenticate("fnorris", "F4HNd");
res.then((value) => { console.log(value); });
// const pass = "F4HNd";
// hasher.generateHash(pass).then((value) => { console.log(pass); console.log(value); hasher.checkPassword(pass, value).then((value) => { console.log(value); }) })
