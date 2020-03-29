const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create(req, res) {
        try {
            const { name, email, whatsapp, city, uf} = req.body;

            const id = crypto.randomBytes(4).toString('HEX');

            await connection('ongs').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf
            });

            return res.json({ id });
        } catch (error) {
            console.log(error);
            return res.status(400).json({'error': 'Ocorreu algo de errado.'});
        }
    },

    async index(req, res){
        const ongs = await connection('ongs').select('*');
        return res.json(ongs);
    }

}