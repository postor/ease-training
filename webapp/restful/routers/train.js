/**
 * 自动生成的代码
 */

var express = require('express')
var router = express.Router()
var Model = require('../models/train').Model
var parseQuery = require('../utils').parseQuery
var knex = require('../bookshelf').knex
var bodyParser = require('body-parser')

router.use(bodyParser.json())

router.get('/', (req, res, next) => {
  var parsed = parseQuery(req.query)
  var totalCount = 0
  getQuery(parsed).count()
    .then((count) => {
      count = count[0]
      totalCount = count[Object.keys(count)[0]]
      return getQueryWithMAP(parsed)
        .offset(parsed.offset)
        .limit(parsed.limit)
    })
    .then((result) => {
      res.set('X-Total-Count', totalCount)

      res.json(result)

    }, (err) => {
      console.log(err)
      res.status(500).send(err.message || err)
    })

  function getQuery(parsed) {
    var query = Model.query()
    query.where(parsed.where)
    if (parsed.sort.column && parsed.sort.column) {
      query = query.orderBy(parsed.sort.column, parsed.sort.direction)
    }
    return query
  }

  function getQueryWithMAP(parsed) {
    var query = knex('train')
      .select(knex.raw('train.*, MAX(m_ap) as m_ap'))
      .leftJoin('epoch', 'train.id', 'epoch.job_id')
      .groupBy('train.id')
    query.where(parsed.where)
    if (parsed.sort.column && parsed.sort.column) {
      query = query.orderBy(parsed.sort.column, parsed.sort.direction)
    }
    return query
  }
})


router.post('/', (req, res, next) => {
  new Model(req.body).save()
    .then((model) => {
      res.json(model)
    }, (err) => {
      res.status(500).send(err.message || err)
    })
})


router.get('/:id', (req, res, next) => {

  Model.where({ id: req.params.id })
    .fetch()
    .then((model) => {
      res.json(model)
    }, (err) => {
      res.status(500).send(err.message || err)
    })

})

router.put('/:id', (req, res, next) => {

  new Model({
    id: req.params.id
  }).save(req.body, {
    method: 'update',
    patch: true
  }).then((model) => {
    res.json(model)
  }, (err) => {
    res.status(500).send(err.message || err)
  })


})

router.delete('/:id', (req, res, next) => {

  new Model({
    id: req.params.id
  }).destroy()
    .then(() => {
      res.json({
        error: 0
      })
    }, (err) => {
      res.status(500).send(err.message || err)
    })


})

module.exports = router