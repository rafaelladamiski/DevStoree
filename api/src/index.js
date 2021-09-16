import db from './db.js';
import express from 'express'
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json());

app.get('/produto', async (req, resp) => {
    try {
        let produto = await db.tb_produto.findAll()
        resp.send (produto);
    } catch (e) {
        resp.send( 'Algo de errado não está certo' )
    }
        
})

app.post('/produto', async (req, resp) => {
    try {
        let { nome, categoria, precoDe, precoPor, avaliacao, descricao, estoque, imagem, ativo, inclusao } = req.body;

        let r = await db.tb_produto.create({
            nm_produto: nome,
            ds_categoria: categoria,
            vl_preco_de: precoDe,
            vl_preco_por: precoPor,
            vl_avaliacao: avaliacao,
            ds_produto: descricao,
            qtd_estoque: estoque,
            img_produto: imagem,
            bt_ativo: ativo,
            dt_inclusao: inclusao
        })
        resp.send(r);

    } catch (e) {
        resp.send( 'Algo de errado não está certo' )
    }
})

app.put('/produto/:id', async (req, resp) => {
    try {
        let { nome, categoria, precoDe, precoPor, avaliacao, descricao, estoque, imagem, ativo, inclusao } = req.body;
        let { id } = req.params;

        let r = await db.tb_produto.update(
            {
                nm_produto: nome,
            ds_categoria: categoria,
            vl_preco_de: precoDe,
            vl_preco_por: precoPor,
            vl_avaliacao: avaliacao,
            ds_produto: descricao,
            qtd_estoque: estoque,
            img_produto: imagem,
            bt_ativo: ativo,
            dt_inclusao: inclusao
            },

            {
                where: { id_produto: id}
            }
        )
        resp.sendStatus(200);
    } catch (e) {
        resp.send('Algo de errado não está certo')
    }
})

app.delete('/produto/:id', async (req, resp) => {
    try{
        let { id } = req.params;

        let r = await db.tb_produto.destroy({ where: { id_produto: id } })
        resp.sendStatus(200);
    }catch (e) {
        resp.send('Algo de errado não está certo');
    }
})

app.listen(process.env.PORT,

x => console.log(`Server up at port ${process.env.PORT}`))