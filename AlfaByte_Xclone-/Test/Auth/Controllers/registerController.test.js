const {createUser} = require("../../../Auth/Controllers/registerController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../../Auth/Models/User");

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../../Auth/Models/User");

describe('registerController.js', () => {
  describe('createUser', () => {
    let req, res;

    beforeEach(() => {
      req = {
        body: {
          phoneNumber: 1234567890,
          name: 'Usuario de Prueba',
          email: 'prueba@example.com',
          password: 'contrasena123',
          following: [],
          followers: []
        }
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });

    it('debería crear un nuevo usuario y devolver un token', async () => {
      const hashedPassword = 'hashedPassword';
      bcrypt.hash.mockResolvedValue(hashedPassword);

      const user = {
        save: jest.fn().mockResolvedValue(true),
        id: 'userId',
        email: 'prueba@example.com'
      };
      User.mockImplementation(() => user);

      const token = 'jwtToken';
      jwt.sign.mockReturnValue(token);

      await createUser(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith('contrasena123', 10);
      expect(User).toHaveBeenCalledWith({
        name: 'Usuario de Prueba',
        email: 'prueba@example.com',
        password: 'hashedPassword',
        phoneNumber: '1234567890',
        following: [],
        followers: []
      });
      expect(user.save).toHaveBeenCalled();
      expect(jwt.sign).toHaveBeenCalledWith(
        { email: 'prueba@example.com', name: 'Usuario de Prueba', phoneNumber: '1234567890' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        ok: true,
        message: 'Usuario Registrado',
        user: {
          id: 'userId',
          email: 'prueba@example.com'
        },
        token
      });
    });

    it('debería devolver un error 500 si algo sale mal', async () => {
      const error = new Error('Algo salió mal');
      bcrypt.hash.mockRejectedValue(error);

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        ok: false,
        error: 'ALGO SALIÓ MAL, VERIFICA TUS DATOS'
      });
    });
  });
});