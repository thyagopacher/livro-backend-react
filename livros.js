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

module.exports = router;