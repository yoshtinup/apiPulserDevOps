import { history_userService } from '../../services/history_userService';
import { db } from '../../database/mysql';

// Mock the database module
jest.mock('../../database/mysql', () => ({
  db: {
    query: jest.fn(),
  },
}));

describe('history_userService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const mockData = [{ id: 1, hora_entrada: '09:00', hora_salida: '17:00', fecha: '2023-09-22' }];
      db.query.mockResolvedValue([mockData]);

      const result = await history_userService.getAllProducts();
      expect(result).toEqual(mockData);
      expect(db.query).toHaveBeenCalledWith("SELECT * FROM historial_usuario", []);
    });

    it('should return null on error', async () => {
      db.query.mockRejectedValue(new Error('Database error'));

      const result = await history_userService.getAllProducts();
      expect(result).toBeNull();
    });
  });

  describe('getOneProduct', () => {
    it('should return one product by id', async () => {
      const mockProduct = { id: 1, hora_entrada: '09:00', hora_salida: '17:00', fecha: '2023-09-22' };
      db.query.mockResolvedValue([[mockProduct]]);

      const result = await history_userService.getOneProduct(1);
      expect(result).toEqual(mockProduct);
      expect(db.query).toHaveBeenCalledWith("SELECT * FROM historial_usuario WHERE id=?", [1]);
    });

    it('should return null on error', async () => {
      db.query.mockRejectedValue(new Error('Database error'));

      const result = await history_userService.getOneProduct(1);
      expect(result).toBeNull();
    });
  });

  describe('createNewProduct', () => {
    it('should create a new product', async () => {
      const newProduct = { hora_entrada: '09:00', hora_salida: '17:00', fecha: '2023-09-22' };
      db.query.mockResolvedValue([{ insertId: 1 }]);

      const result = await history_userService.createNewProduct(newProduct);
      expect(result).toEqual({ ...newProduct, id: 1 });
      expect(db.query).toHaveBeenCalledWith(
        "INSERT INTO historial_usuario (hora_entrada, hora_salida, fecha) VALUES (?, ?, ?)",
        ['09:00', '17:00', '2023-09-22']
      );
    });

    it('should return null on error', async () => {
      const newProduct = { hora_entrada: '09:00', hora_salida: '17:00', fecha: '2023-09-22' };
      db.query.mockRejectedValue(new Error('Database error'));

      const result = await history_userService.createNewProduct(newProduct);
      expect(result).toBeNull();
    });
  });

  describe('deleteOneProduct', () => {
    it('should delete a product', async () => {
      const mockResult = { affectedRows: 1 };
      db.query.mockResolvedValue([mockResult]);

      const result = await history_userService.deleteOneProduct(1);
      expect(result).toEqual([mockResult]);
      expect(db.query).toHaveBeenCalledWith('DELETE FROM history_userService WHERE id = ?', [1]);
    });

    it('should return null on error', async () => {
      db.query.mockRejectedValue(new Error('Database error'));

      const result = await history_userService.deleteOneProduct(1);
      expect(result).toBeNull();
    });
  });
});