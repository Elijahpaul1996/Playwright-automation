

class LoginPage {

  constructor(page) {
    this.page = page;
  }

  async loginWithMicrosoft() {

    // Capture popup the moment Sign In is clicked
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.getByRole('button', { name: 'Sign in with Microsoft' }).click()
    ]);

    await popup.waitForLoadState('domcontentloaded');
    console.log('SSO popup opened');
    await popup.getByText('Elijah Paul').click();
    //await popup.getByRole('text', { name: 'Elijah Paul' }).click();
    console.log('Account selected');

    //await popup.waitForEvent('close');
    //await this.page.waitForLoadState('networkidle');
    //console.log('Login complete');
  }
}

module.exports = LoginPage;

