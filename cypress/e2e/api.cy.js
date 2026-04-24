
describe('API Test Fetch of Counter', () => {
    beforeEach(() => {
      cy.request('PUT', '/reset')
    })

    it('should successfully retrieve count data', () => {
      cy.request('GET', '/')
        .then((response) => {
          expect(response.status).to.equal(200)
          expect(response.body).to.have.property('count')
        })
    })

    it('should increment the counter', () => {
      cy.request('PUT', '/inc')
        .then((response) => {
          expect(response.status).to.equal(204)
        })

      cy.request('GET', '/')
        .then((response) => {
          expect(response.status).to.equal(200)
          expect(response.body.count).to.equal(1)
        })
    })

    it('should decrement the counter', () => {
      cy.request('PUT', '/dec')
        .then((response) => {
          expect(response.status).to.equal(204)
        })

      cy.request('GET', '/')
        .then((response) => {
          expect(response.status).to.equal(200)
          expect(response.body.count).to.equal(-1)
        })
    })

    it('should reset the counter', () => {
      cy.request('PUT', '/inc')
      cy.request('PUT', '/reset')
        .then((response) => {
          expect(response.status).to.equal(204)
        })

      cy.request('GET', '/')
        .then((response) => {
          expect(response.status).to.equal(200)
          expect(response.body.count).to.equal(0)
        })
    })

  })
