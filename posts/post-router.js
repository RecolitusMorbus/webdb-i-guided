const express = require('express');

/* 'db' accesses the database through knex. */
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
  db
    .select('*')
    .from('posts')
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ err: 'Failed to retrieve posts from database.'})
    });
});

router.get('/:id', (req, res) => {
  db
    .select('*')
    .from('posts')
    .where('id', '=', req.params.id)
    .first()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ err: 'Failed to retrieve post from database.'})
    });
});

router.post('/', (req, res) => {
  db
    .insert(req.body, 'id')
    .into('posts')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ err: 'Failed to insert post.'});
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;

  db('posts')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ err: 'Failed to update post.' });
    });
});

router.delete('/:id', (req, res) => {
  const changes = req.body;

  db('posts')
    .where({ id: req.params.id })
    .delete()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ err: 'Failed to delete post.' });
    });
});

module.exports = router;