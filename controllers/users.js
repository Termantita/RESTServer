const { response, request } = require('express');

const usersGet = (req = request, res = response) => {
  const { q, name, apikey, page = 1, limit } = req.query;

  res.json({
    msg: 'GET api',
    q, 
    name, 
    apikey, 
    page,
    limit
  });
}

const usersPost = (req, res = response) => {
  const {id, name} = req.body;
  
  res.json({
    msg: 'POST api',
    id, name
  })
}

const usersPut = (req, res = response) => {
  const id = req.params.id;

  res.json({
    msg: 'PUT api',
    id
  })
}

const usersDelete = (req, res = response) => {
  res.json({
    msg: 'DELETE api'
  })
}

const usersPatch = (req, res = response) => {
  res.json({
    msg: 'PATCH api'
  })
}


module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch
}