const chai = require('chai')

// eslint-disable-next-line no-unused-vars
const should = chai.should()

// eslint-disable-next-line no-undef
describe('function test()', () => {
  // eslint-disable-next-line no-undef
  it('should return true', async () => {
    try {
      const data = true
      return data
    } catch (err) {
      throw err
    }
  })
})
