// lastMod.js
module.exports = exports = function lastModifiedPlugin (schema, options) {
  schema.add({ lastMod: Date })
  
  schema.pre('save', function (next) {
    this.lastMod = new Date
    console.log('plugin call next');
    next()
  })
  
  if (options && options.index) {
    schema.path('lastMod').index(options.index)
  }
}