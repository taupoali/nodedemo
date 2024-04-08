
describe('API Test Fetch of Counter', () => {
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
    })

    it('test the counter increased', () => {
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
    })

    it('test the counter decreased', () => {
      cy.request('GET', '/')
        .then((response) => {
          expect(response.status).to.equal(200)
          expect(response.body.count).to.equal(0)
        })
    })

  })
