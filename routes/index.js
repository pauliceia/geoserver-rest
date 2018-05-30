module.exports = (app, environment) => {

    require('./status')(app, environment)
    require('./layers')(app, environment)

}