const express = require('express');

const knex = require('../data/dbConfig');
const router = express.Router();

router.get('/', (req,res) => {
  knex
  ('accounts')
  .then(accounts => {
    res.json(accounts)
  })
  .catch(err => {
    res.status(500).json({message: "could not list accounts"})
  })
})

router.get('/:id', (req,res) => {
  knex('accounts')
  .where('id', '=', req.params.id)
  .then(accounts => {
    if(accounts.length > 0){
      res.status(200).json(accounts)
    }else{
      res.status(500).json({error: "failed to get account by ID"})
    }
  })
})

router.post('/', (req,res) => {
  nb = req.body;
  knex('accounts')
  .insert({name: nb.name, budget: nb.budget })
  .then(accounts => {
    res.status(201).json(accounts)
  })
  .catch(err => {
    res.status(500).json({error: "error while posting name and budget"})
  })
})

router.put('/:id', (req,res) => {
  nb = req.body;
  knex('accounts')
  .where('id', '=', req.params.id)
  .update({name: nb.name, budget: nb.budget})
  .then(accounts => {
    res.status(200).json(accounts)
  })
  .catch(err => {
    res.status(500).json({error: "Error while updating name and budget"})
  })
})

router.delete('/:id', (req,res) => {
  knex('accounts')
  .where({id: req.params.id})
  .del()
  .then(accounts => {
    res.status(200).json(accounts)
  })
  .catch(err => {
    res.status(500).json({error: "error removing id from the database"})
  })
})






module.exports = router;