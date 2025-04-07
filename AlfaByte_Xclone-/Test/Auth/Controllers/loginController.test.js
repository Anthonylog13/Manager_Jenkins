const httpMocks = require("node-mocks-http");
const { LoginUser } = require("../../../Auth/Controllers/loginController");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../../Auth/Models/User");

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../../Auth/Models/User");

describe("loginController.js", () => {
  describe("LoginUser", () => {
    describe("when login with invalid email", () => {
      test("should return 404 if user does not exist", async () => {
        const req = httpMocks.createRequest({
          method: "POST",
          body: { email: "mifarafai@gmail.com", password: "fufufufu131351" },
        });
        const res = httpMocks.createResponse();

        User.findOne.mockResolvedValue(null); 

        await LoginUser(req, res);

        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toEqual({
          ok: false,
          error: "Invalid Credentials, please check again!",
        });
      });
    });

    describe("when password is invalid", () => {
      test("should return 401 if password is incorrect", async () => {
        const req = httpMocks.createRequest({
          method: "POST",
          body: { email: "anastaciaMorocha@yahoo.com.co", password: "ajshydhasd1245654" },
        });
        const res = httpMocks.createResponse();

        const mockUser = {
          email: "anastaciaMorocha@yahoo.com.co",
          password: "66666asdasdasdasd",
        };
        User.findOne.mockResolvedValue(mockUser); 

        bcrypt.compare.mockResolvedValue(false); 
        await LoginUser(req, res);

        expect(res.statusCode).toBe(401);
        expect(res._getJSONData()).toEqual({
          ok: false,
          error: "Invalid Credentials, please check again!",
        });
      });
    });

    describe("when token is missing", () => {
      test("should return 401 if token is missing", async () => {
        const req = httpMocks.createRequest({
          method: "POST",
          body: { email: "Tengohambre@vandejapisa.com", password: "Chicarron" },
        });
        const res = httpMocks.createResponse();

        const mockUser = {
          email: "Tengohambre@vandejapisa.com",
          password: "Chicarron",
        };
        User.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true);

        await LoginUser(req, res);

        expect(res.statusCode).toBe(401);
        expect(res._getJSONData()).toEqual({
          ok: false,
          error: "Missing Token!",
        });
      });
    });

    describe("when token is invalid", () => {
      test("should return 403 if token is invalid", async () => {
        const req = httpMocks.createRequest({
          method: "POST",
          body: { email: "valid@example.com", password: "password123" },
          headers: { authorization: "invalidToken" },
        });
        const res = httpMocks.createResponse();

        const mockUser = {
          email: "valid@example.com",
          password: "hashedPassword",
        };
        User.findOne.mockResolvedValue(mockUser);

        bcrypt.compare.mockResolvedValue(true);

        jwt.verify.mockImplementation((token, secret, callback) => {
          callback(new Error("Invalid Token"), null);
        });

        await LoginUser(req, res);

        expect(res.statusCode).toBe(403);
        expect(res._getJSONData()).toEqual({
          ok: false,
          error: "Invalid Token!",
        });
      });
    });

    describe("when login is successful", () => {
      test("should return 200 and user information if login is successful", async () => {
        const req = httpMocks.createRequest({
          method: "POST",
          body: { email: "empanadapaisa@gmailcom", password: "68464546454sadasd" },
          headers: { authorization: "validToken" },
        });
        const res = httpMocks.createResponse();

        const mockUser = {
          id: "1",
          email: "empanadapaisa@gmailcom",
          password: "68464546454sadasd",
        };
        User.findOne.mockResolvedValue(mockUser); 

        bcrypt.compare.mockResolvedValue(true); 
        jwt.verify.mockImplementation((token, secret, callback) => {
          callback(null, { id: "1" });
        });

        await LoginUser(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({
          ok: true,
          message: "You are logged in",
          user: {
            id: "1",
            email: "empanadapaisa@gmailcom",
          },
        });
      });
    });

    
    describe("when an unexpected error occurs", () => {
      test("should return 500 if there is an internal server error", async () => {
        const req = httpMocks.createRequest({
          method: "POST",
          body: { email: "guacamole@butifarra.com", password: "a9s8d4as68d4asd4" },
        });
        const res = httpMocks.createResponse();

       
        User.findOne.mockRejectedValue(new Error("Database error")); 

        await LoginUser(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({
          ok: false,
          error: "SOMETHING WENT WRONG, CHECK YOUR DATA AGAIN",
        });
      });
    });
  });
});
