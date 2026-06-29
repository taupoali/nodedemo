
describe('API Test Fetch of Counter', () => {
    beforeEach(() => {
      cy.putAction('/reset')
    })

    it('should successfully retrieve count data', () => {
      cy.request('GET', '/')
        .then((response) => {
          expect(response.status).to.equal(200)
          expect(response.body).to.have.property('count')
        })
    })

    it('should increment the counter', () => {
      cy.putAction('/inc')
      cy.expectCount(1)
    })

    it('should decrement the counter', () => {
      cy.putAction('/dec')
      cy.expectCount(-1)
    })

    it('should reset the counter', () => {
      cy.putAction('/inc')
      cy.putAction('/reset')
      cy.expectCount(0)
    })

  })
