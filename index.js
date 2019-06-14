/*ErtuAPI client
    v.1.3.0
  Get a token: https://ertu-datacenter.glitch.me/register
*/
const Profile = require('./profile')
module.exports = class ErtuAPI {
  /**
   * @param {String} token token of ErtuAPI
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
    if (this.token === 'ertuapitest') console.warn('[ErtuAPI] Note: Key ertuapitest not recommend to use')
    /** @access private*/
    this.http = require('centra')(this.baseURL).header(
      'TOKEN',
      `Bot ${this.token}`
    )
  /** 
   * @param {String} id ID of the user
   * @param {String} time Time (example: 1h)
   * @returns {Promise<DailyInfo>} JSON updated information about daily for this id
  */
    this.daily.set = async (id, time = '24h') => {
      const res = await this.http.path('/daily').query({
        'user': id,
        'time': time,
        'method': 'set'
      })
      return res.json()
    }
    this.profile = new Profile(this.token, options)
  }
  /**
   * @returns {Promise<MemeResponse>} Promise object with JSON of meme
  */
  async meme () {
    const res = await this.http.path('/meme')
    return res.json()
  }
  /** 
   * @param {String} id ID of the user
   * @returns {Promise<Profile>} Promise object with JSON of profile
  */
  async profile (id) {
    const res = await this.http.path('/profile').query({
      'user': id,
      'method': 'check'
    })
    return res.json()
  }
  /** 
   * @param {String} id ID of the user
   * @returns {Promise<DailyInfo>} JSON information about daily for this id
  */
  async daily (id) {
    const res = await this.http.path('/daily').query({
      'user': id,
      'method': 'info'
    })
    return res.json()
  }
  /**
   * @param {Date} date Timestamp (optional)
   * @returns {Number} Ping of ErtuAPI in ms
   */
  async ping (date) {
    const res = await require('centra')(this.baseURL.toString().slice(0, -3)).path('/ping')
    return (date || Date.now()) - res.json().ts
  }
}