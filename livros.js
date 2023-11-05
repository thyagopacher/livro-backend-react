const express = require('express');
const router = express.Router();

const dbKnex = require("./data/db_config");

//método usado para consulta
router.get("/", async (req, res) => {
  try{
    //para obter os livros pode usar .select().orderBy() ou apenas orderBy()
    const livros = await dbKnex('livros').orderBy('id', 'desc');
    res.status(200).json(livros);
  }catch(error){
    res.status(404).json({ msg: error.message });
  }
});

router.post("/", async(req, res) => {

  //faz a desestruturação dos dados recebidos no corpo da requisição.
  const { titulo, autor, ano, preco, foto } = req.body;

  //se algum dos dados não foi passado, irá enviar uma msg de erro.
  if(!titulo || !autor || !ano || !preco || !foto){
    res.status(400).json({ msg: "Enviar titulo, autor, ano, preço, e foto do livro por favor." });
  }

  //caso ocorra algum erro na inclusão o programa irá capturar o catch
  try{
    const novo = await dbKnex('livros').insert({
      titulo,
      autor,
      ano,
      preco,
      foto
    });
    res.status(201).json({ id: novo[0] });
  }catch(error){
    res.status(400).json({ msg: error.message });
  }
});

//método put é usado para alteração e o ID indica o registro para ser alterado
router.put("/:id", async(req, res) => {

  const id = req.params.id;
  const { preco } = req.body; // campo para ser alterado

  //caso ocorra algum erro na alteração o programa irá capturar o catch
  try{
    await dbKnex('livros').update({ preco }).where("id", id);
    res.status(200).json();
  }catch(error){
    res.status(400).json({ msg: error.message });
  }
});

//método delete é usado para exclusão
router.delete("/:id", async(req, res) => {

  const id = req.params; // id do registro para ser excluido

  //caso ocorra algum erro na exclusão o programa irá capturar o catch
  try{
    await dbKnex('livros').del().where({ id });
    res.status(200).json(); // statusCode indica OK
  }catch(error){
    res.status(400).json({ msg: error.message });
  }
});

router.get("/filtro/:palavra", async (req, res) => {
    const palavra = req.params.palavra;

    try{
      const livros = await dbKnex('livros')
      .where("titulo", "like", `%${palavra}%`)
      .orWhere("autor", "like", `%${palavra}%`);

      res.status(200).json(livros); // statusCode indica OK
    }catch(error){
      res.status(400).json({ msg: error.message });
    }
});

router.get("/dados/resumo", async (req, res) => {
  const palavra = req.params.palavra;

  try{
    const consulta = await dbKnex('livros')
      .count({ num: '*'})
      .sum({ soma: 'preco' })
      .max({ maior: 'preco' })
      .avg({ media: 'preco' });
    
    const { num, soma, maior, media } = consulta[0];
    res.status(200).json({ num, soma, maior, media: Number(media.toFixed(2)) }); // statusCode indica OK

  }catch(error){
    res.status(400).json({ msg: error.message });
  }
});

router.get("/dados/grafico", async (req, res) => {
  try{
    
    const totalPorAno = await dbKnex('livros').select('ano')
      .sum({ total: 'preco' })
      .groupBy('ano');
    
    res.status(200).json(totalPorAno); // statusCode indica OK

  }catch(error){
    res.status(400).json({ msg: error.message });
  }
});



module.exports = router;