/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('livros').del()
  await knex('livros').insert([
    {titulo: "Web Design Responsivo", autor: "Mauricio Samy Silva", ano: 2014, preco: 73.5, foto: "https:://s3.novatec.com.br/capas/9788575223925.jpg"},
    {titulo: "Proteção moderna de dados", autor: "W. Curtis Preston", ano: 2021, preco: 97.9, foto: "https:://s3.novatec.com.br/capas/9786586057843.jpg"}
  ]);
};
