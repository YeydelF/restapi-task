import app from './app.js'
import './database.js'
//listen port
app.listen(app.get('port'))
    console.log('server on port', app.get('port'))
