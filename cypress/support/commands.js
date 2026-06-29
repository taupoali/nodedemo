// Shared helpers for the counter API tests.
// See https://on.cypress.io/custom-commands for more info.

// Issue a PUT and assert the server responds with 204 No Content.
Cypress.Commands.add('putAction', (path) => {
  cy.request('PUT', path).then((response) => {
    expect(response.status).to.equal(204)
  })
})

// GET / and assert the count equals the expected value.
Cypress.Commands.add('expectCount', (expected) => {
  cy.request('GET', '/').then((response) => {
    expect(response.status).to.equal(200)
    expect(response.body.count).to.equal(expected)
  })
})