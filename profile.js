module.exports = class Profile {
    /** 
     * @param {String} token token to ErtuAPI
     * @param {Object} options options
     */
    constructor (token, options = {}) {
    /** @access private*/
    this.baseURL = options.baseURL || 'https://ertu-datacenter.glitch.me/api/v2'
    /** @access private*/
    this.token
    if(!token && process.env.ErtuAPIkey) this.token = process.env.ErtuAPIkey
    else this.token = token
    if (typeof this.token !== 'string') throw new Error('[ErtuAPI] Please make sure your token is a string');
    /** @access private*/
    this.http = require('centra')(this.baseURL).header(
      'TOKEN',
      `Bot ${this.token}`
    )
    }
    
async add () {

}

}