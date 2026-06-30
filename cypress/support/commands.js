// Custom Cypress commands for the counter API tests.
//
// Cypress lets you define reusable commands with Cypress.Commands.add().
// This avoids repeating the same request-and-assert logic in every test.
// Once registered here, any test file can call cy.putAction() or
// cy.expectCount() as if they were built-in Cypress methods.
//
// See https://on.cypress.io/custom-commands for more info.

// Issue a PUT request to the given path and verify the server responds
// with 204 ("No Content") — the standard success code when there is no
// response body to return.
Cypress.Commands.add('putAction', (path) => {
  cy.request('PUT', path).then((response) => {
    expect(response.status).to.equal(204)
  })
})

// GET the root endpoint and verify the count matches what we expect.
// This combines two checks: the status code (200 = OK) and the value
// of the "count" field in the JSON response body.
Cypress.Commands.add('expectCount', (expected) => {
  cy.request('GET', '/').then((response) => {
    expect(response.status).to.equal(200)
    expect(response.body.count).to.equal(expected)
  })
})