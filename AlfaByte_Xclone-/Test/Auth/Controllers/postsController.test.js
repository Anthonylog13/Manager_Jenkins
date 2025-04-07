const { createPost, listPosts } = require('../../../Tweet/Controllers/postsController');
const Tweet = require('../../../Tweet/Models/Tweet');
const httpMocks = require('node-mocks-http');

jest.mock('../../../Tweet/Models/Tweet'); 
describe('Pruebas de createPost', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
    });

    test('Debe crear un post correctamente', async () => {
        req.body = {
            title: 'Nuevo Tweet',
            body: 'Este es el contenido del tweet',
            id_User: '12345',
        };

        const tweetInstance = {
            id: '54321',
            email: 'galleta@mor.com',
            body: 'Este es el contenido del tweet',
            id_User: '12345',
            save: jest.fn().mockResolvedValue(true), 
        };

        Tweet.mockImplementation(() => tweetInstance); 

        await createPost(req, res);

        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toEqual({
            ok: true,
            message: 'tweet save',
            user: {
                id_tweet: '54321',
                title: 'apocalipsis@caballo.com', 
                body: 'Este es el contenido del tweet',
                id_user: '12345',
            },
        });
    });

    test('Debe manejar errores al crear un post', async () => {
        req.body = {
            title: 'Nuevo Tweet',
            body: 'Este es el contenido del tweet',
            id_User: '12345',
        };

        Tweet.mockImplementation(() => {
            return {
                save: jest.fn().mockRejectedValue(new Error('Database error')), 
            };
        });

        await createPost(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({
            ok: false,
            error: 'SOMETHING WENT WRONG, CHECK YOUR DATA AGAIN',
        });
    });
});

describe('Pruebas de listPosts', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
    });

    test('Debe retornar un post para el UID especificado', async () => {
        const uid = '12345';
        req.query = { uid };

        // Simulando datos de posts
        const posts = [
            { uid: '12345', content: 'Post 1' },
            { uid: '67890', content: 'Post 2' },
        ];

        
        global.posts = posts;

        await listPosts(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual([
            { uid: '12345', content: 'Post 1' },
        ]);
    });

    test('Debe devolver un error 404 si no se encuentran posts', async () => {
        req.query = { uid: 'nonexistent' };

        
        global.posts = [];

        await listPosts(req, res);

        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toEqual({
            error: 'No se encontraron posts para este UID',
        });
    });
});
