import express from "express";
import Repository from "../repository/repository";
import Service from "../service/service";
import Controller from "../controller/controller";

// Instances de classes
const _repository = new Repository();
const _service = new Service(_repository);
const _controller = new Controller(_service);
const router = express.Router();

// Routes

// ********************* USERS *********************
router.get("/users", _controller.getAllUsers);
router.get("/users/:id", _controller.getUserById);
router.get("/users/email/:email", _controller.getUserByEmail);
router.post("/users", _controller.createUser);
router.put("/users/:id", _controller.updateUser);

// ********************* POKEMONS *********************
router.get("/pokemons", _controller.getAllPokemons);

// ********************* TOKENS *********************
router.post("/createToken", _controller.createToken);
router.get("/verifyToken", _controller.verifyToken);

// ****************** VERIFICATIONS ******************
router.post("/hashPassword", _controller.hashPassword);
router.post("/verifyPassword", _controller.verifyHashPassword);
router.post("/verifyEmail", _controller.verifyEmailAlreadyExists);

export default router;
