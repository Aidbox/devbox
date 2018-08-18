import '@babel/polyfill'
import Promise from 'bluebird'

import 'normalize.css'
import 'ehrSrc/styles/app.global.scss'

// import createDebug from 'debug'
localStorage.debug = 'ehr:*'

window.Promise = Promise

require('./render')
