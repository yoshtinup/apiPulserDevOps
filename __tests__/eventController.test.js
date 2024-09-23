
import { history_userService } from '../v1/services/history_userService.js';
import { db } from '../database/mysql.js';

jest.mock('../../database/mysql.js'); // Mockear el módulo de la base de datos

describe('History User Service', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpiar mocks después de cada prueba
    });

    test('getAllProducts should return all products', async () => {
        const mockData = [{ id: 1, hora_entrada: '10:30', hora_salida: '12:20', fecha: '2024-09-22' }];
        db.query.mockResolvedValue([mockData]); // Simular respuesta de la base de datos

        const result = await history_userService.getAllProducts();
        expect(result).toEqual(mockData);
        expect(db.query).toHaveBeenCalledWith("SELECT * FROM historial_usuario", []);
    });

    test('getOneProduct should return a single product', async () => {
        const mockProduct = { id: 1, hora_entrada: '10:30', hora_salida: '12:20', fecha: '2024-09-22' };
        db.query.mockResolvedValue([[mockProduct]]); // Simular respuesta de la base de datos

        const result = await history_userService.getOneProduct(1);
        expect(result).toEqual(mockProduct);
        expect(db.query).toHaveBeenCalledWith("SELECT * FROM historial_usuario WHERE id=?", [1]);
    });

    test('createNewProduct should create a new product', async () => {
        const newProduct = { hora_entrada: '10:30', hora_salida: '12:20', fecha: '2024-09-22' };
        const mockResult = { insertId: 1 };
        db.query.mockResolvedValue([mockResult]); // Simular respuesta de la base de datos

        const result = await history_userService.createNewProduct(newProduct);
        expect(result).toEqual({ ...newProduct, id: 1 });
        expect(db.query).toHaveBeenCalledWith("INSERT INTO historial_usuario (hora_entrada, hora_salida, fecha) VALUES (?, ?, ?)", [newProduct.hora_entrada, newProduct.hora_salida, newProduct.fecha]);
    });

    test('deleteOneProduct should delete a product', async () => {
        const id = 1;
        db.query.mockResolvedValue([{}]); // Simular respuesta de la base de datos

        const result = await history_userService.deleteOneProduct(id);
        expect(result).toEqual({});
        expect(db.query).toHaveBeenCalledWith('DELETE FROM history_userService WHERE id = ?', [id]);
    });
});
