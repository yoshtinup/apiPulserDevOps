import {db} from '../../database/mysql.js'

export const history_userService = {
    getAllProducts : async () => {
        const sql = "SELECT * FROM historial_usuario";
        try {
            const [data] = await db.query(sql, []);
            return data;
        } catch (error) {
            return null;
        }
    },    
    
    getOneProduct : async (id) => {
        const sql = "SELECT * FROM historial_usuario WHERE id=?";
        const params = [id];
        try {
            const [result] = await db.query(sql, params);
            return result[0];
        } catch (error) {
            console.log("E")
            return null;
        }
    },
     
    createNewProduct : async (product) => {
        const sql = "INSERT INTO historial_usuario (hora_entrada, hora_salida, fecha) VALUES (?, ?, ?)";
        const params = [product.hora_entrada, product.hora_salida, product.fecha];
        try {
            const [resultado] = await db.query(sql, params);
            return {
                hora_entrada: product.hora_entrada,
                hora_salida: product.hora_salida, 
                fecha: product.fecha, 
                id: resultado.insertId
            }
        } catch (error) {
            return null;
        }
    },
    
    deleteOneProduct : async (id) => {
        const sql = 'DELETE FROM history_userService WHERE id = ?';
        const params = [id];
        try {
            const result = await db.query(sql, params);
            return result;
        } catch (error) {
            return null;
        }
    }
}