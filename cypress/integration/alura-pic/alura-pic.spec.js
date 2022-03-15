describe('Login e registro de usuário alura pic', ()=> {

    beforeEach (() => {
        cy.visit('https://alura-fotos.herokuapp.com')
    })

    it('verifica mensagem validação', () =>{
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Email is required!').should('be.visible');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'User name is required!').should('be.visible');
        cy.contains('ap-vmessage', 'Password is required!').should('be.visible');
        cy.contains('ap-vmessage', 'Full name is required!').should('be.visible');

    })

    it('verifica mensagem de e-mail inválido', () =>{
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="email"]').type('deb');
        cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible');

    })

    it('verifica mensagem de full lenght de password', () =>{
        cy.contains('a', 'Register now').click();
        cy.get('input[formcontrolname="password"]').type('deb');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible');

    })
    
    it('verifica mensagem de username already taken', () =>{
        cy.contains('a', 'Register now').click();
        cy.get('input[formcontrolname="userName"]').type('flavio');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Username already taken').should('be.visible');

    })

    it('verifica mensagem de Mininum length is 2', () =>{
        cy.contains('a', 'Register now').click();
        cy.get('input[formcontrolname="fullName"]').type('d');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible');

    })

    it('verifica mensagem de must be lower case', () =>{
        cy.contains('a', 'Register now').click();
        cy.get('input[formcontrolname="userName"]').type('Deb');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Must be lower case').should('be.visible');

    })

    it('fazer login de usuário válido', () => {
        cy.login('flavio', '123')
        cy.on ('window:alert', (str) => {
            expect(str).to.equal('Invalid user name or password')
        })
    })

    it('fazer login de usuário inválido', () => {
        cy.login('deb', 'deb')
        cy.on ('window:alert', (str) => {
            expect(str).to.equal('Invalid user name or password')
        })
    })


})