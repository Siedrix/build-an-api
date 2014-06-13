var _ = require('underscore')
var config = require('../../config')
var mongoose = require('mongoose')

mongoose.connect(config.mongoUrl)
var db = mongoose.connection
mongoose.set('debug', !!config.mongoDebug)
db.on('error', function () {
  return console.error.bind(console, '[mongo]: ')
})
db.once('open', function () {
  console.log('Mongo connected to ' + config.mongoUrl)
})

var models = {},
    loadedModels = []

exports.loadModels = function () {
  _.each(_.toArray(arguments), function (modelName) {
    if (! _.include(loadedModels, modelName)) {
      var Model,
          exported = require('../../models/' + modelName)
      if (typeof exported === 'function') {
        Model = exported
      } else if (exported.model) {
        Model = exported.model
      }

      if (Model) {
        models[Model.modelName] = Model
        loadedModels.push(modelName)
      }
    }
  })
}

exports.model = function (name) {
  return models[name]
}