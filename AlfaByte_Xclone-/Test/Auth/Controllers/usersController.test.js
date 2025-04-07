const httpMocks = require('node-mocks-http');
const { listFollowing, listFollowers } = require('../../../Follow/Controllers/usersController');
const User = require('../../../Auth/Models/User');

jest.mock('../../../Auth/Models/User');

describe('Users Controller', () => {

  describe('listFollowing', () => {
    test('should return 404 if user is not found', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: { email: 'VivaElViocio@BARETO.com' }
      });
      const res = httpMocks.createResponse();

      User.findOne.mockResolvedValue(null);

      await listFollowing(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({
        ok: false,
        error: 'Usuario no encontrado!'
      });
    });

    test('should return following list if user exists', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: { email: 'EstoycansadoJefe@explotacionlaboral.com' }
      });
      const res = httpMocks.createResponse();

      const mockUser = {
        email: 'EstoycansadoJefe@explotacionlaboral.com',
        following: [{ id_user: 1, email: 'ButiffarraBraba@carnes.com', name: 'Follow User' }]
      };

      User.findOne.mockResolvedValue(mockUser); 

      await listFollowing(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({
        ok: true,
        following: mockUser.following
      });
    });

    test('should return 500 on server error', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: { email: 'error@example.com' }
      });
      const res = httpMocks.createResponse();

      User.findOne.mockRejectedValue(new Error('Database error')); 

      await listFollowing(req, res);

      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({
        ok: false,
        msg: 'Error al obtener la lista de following.'
      });
    });
  });

  describe('listFollowers', () => {
    test('should return 404 if user is not found', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: { email: 'Hamburguesito@pan.com' }
      });
      const res = httpMocks.createResponse();

      User.findOne.mockResolvedValue(null);

      await listFollowers(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({
        ok: false,
        error: 'Usuario no encontrado!'
      });
    });

    test('should return followers list if user exists', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: { email: 'soponcio@sombrero.com' }
      });
      const res = httpMocks.createResponse();

      const mockUser = {
        email: 'soponcio@sombrero.com',
        followers: [{ id_user: 2, email: 'uriquitacati@uriquitacata', name: 'Follower User' }]
      };

      User.findOne.mockResolvedValue(mockUser); 

      await listFollowers(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({
        ok: true,
        followers: mockUser.followers
      });
    });

    test('should return 500 on server error', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: { email: 'mafalda@falda.com' }
      });
      const res = httpMocks.createResponse();

      User.findOne.mockRejectedValue(new Error('Database error')); 

      await listFollowers(req, res);

      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({
        ok: false,
        msg: 'Error al obtener la lista de followers.'
      });
    });
  });
});
