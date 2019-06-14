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
      'token',
      `Bot ${this.token}`
    )
    }
    
/**
 * @param {String} id ID of the user
 * @param {Number} money Money to add
 * @param {Number} level Level to add
 * @param {Number} xp XP to add
 * @returns {Promise<UpdateProfile>} New profile of this user
 */
async add (id, money = 0, level = 0, xp = 0) {
  const res = await this.http.path('/profile').query({
    'user': id,
    'method': 'add',
    'money': money,
    'level': level,
    'xp': xp
  }).send()
  return res.json()
}

/**
 * @param {String} id ID of the user
 * @param {Number} money Money to remove
 * @param {Number} level Level to remove
 * @param {Number} xp XP to remove
 * @returns {Promise<UpdateProfile>} New profile of this user
 */
async remove (id, money = 0, level = 0, xp = 0) {
  const res = await this.http.path('/profile').query({
    'user': id,
    'method': 'remove',
    'money': money,
    'level': level,
    'xp': xp
  }).send()
  return res.json()
}

/**
 * @param {String} id ID of the user
 * @param {Number} money Money to set
 * @param {Number} level Level to set
 * @param {Number} xp XP to set
 * @returns {Promise<UpdateProfile>} New profile of this user
 */
async set (id, money = 0, level = 0, xp = 0) {
  const res = await this.http.path('/profile').query({
    'user': id,
    'method': 'set',
    'money': money,
    'level': level,
    'xp': xp
  }).send()
  return res.json()

}
/**
 * @returns {Promise<Profile>} Profile of this user
 */
async check (id) {
  const res = await this.http.path('/profile').query({
    'user': id,
    'method': 'check'
  }).send()
  return res.json()
}
/**
 * Warning!
 * This deleted all stats of members in this token
 * @returns {Promise<JSON>} JSON with text: "Reset successfully"
 */
async reset () {
  const res = await this.http.path('/profile').query('method', 'reset').send()
  return res.json()
}

}