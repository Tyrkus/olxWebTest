describe('olx.pl web test', () => {
  beforeEach(() => {
      cy.viewport(1980,1080)
      cy.visit('https://www.olx.pl/')
      cy.wait(1000)
      cy.get("#onetrust-accept-btn-handler").click()

  })
    it('is it possible to see more of the sellers sale announcements', () => {
      cy.get('[data-adnumber="1"]').click()
      cy.get('[data-testid="user-profile-link"] > .css-b5m1rv').click()
    })

    it('is it possible to search by categories', () => {
        cy.get(':nth-child(2) > :nth-child(7) > .item > .link > .cat-icon').click()
        cy.get('#bottom87 > .subcategories-title > .link > strong').click()
        cy.get('[data-testid="total-count"]').should("not.contain", "Znaleźliśmy 0 ogłoszeń")
    })

    it('is it possible to search sale announcements by region', () => {
        cy.get("#cityField").type("warmińsko{enter}")
        cy.get("#submit-searchmain").wait(300).click()
        cy.wait(500)
        cy.get('[data-testid="listing-grid"]').find('[data-cy="l-card"]').eq(1).click()
        cy.get("#mainContent").should("contain", "Warmińsko-mazurskie")
    })

    it('is it possible to search sale announcements by city', () => {
        cy.get("#cityField").type("Olsztyn{enter}")
        cy.get("#submit-searchmain").click()
        cy.wait(500)
        cy.get('[data-testid="location-date"][class="css-veheph er34gjf0"]').should("contain", "Olsztyn")
    })

    it('is it possible to log in', () => {
// testniski@gmail.com Haslotest1234!
        cy.get('#my-account-link > .rel').click()
        cy.origin('https://pl.login.olx.com', () => {
            cy.get('[type=\"email\"]').type("testniski@gmail.com")
            cy.get('[type="password"]').type("Haslotest1234!")
            cy.get(".css-ypypxs").click()
        })
    })

})