

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async loginWithMicrosoft() {
    // Capture popup when clicking Sign in
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.getByRole('button', { name: 'Sign in with Microsoft' }).click()
    ]);

    await popup.waitForLoadState('domcontentloaded');
    console.log('SSO popup opened');

    // Select account
    await popup.getByText('Elijah Paul').click();
    console.log('Account selected');

    // // Wait until popup closes (important)
    // await popup.waitForEvent('close');
    // console.log('SSO popup closed');
  }
}

module.exports = LoginPage;





// class LoginPage {

//   constructor(page) {
//     this.page = page;
//   }

//   async loginWithMicrosoft() {

//     // Capture popup the moment Sign In is clicked
//     const [popup] = await Promise.all([
//       this.page.waitForEvent('popup'),
//       this.page.getByRole('button', { name: 'Sign in with Microsoft' }).click()
//     ]);

//     await popup.waitForLoadState('domcontentloaded');
//     console.log('SSO popup opened');
    
//     // const userName = getMicrosoftAccountLabel();
//     // await popup.getByText(userName).click();

//     // console.log('Account selected');
//     await popup.getByText('Elijah Paul').click();
//     await popup.getByRole('text', { name: 'Elijah Paul' }).click();
//     console.log('Account selected');

//     await popup.waitForEvent('close');
//     await this.page.waitForLoadState('networkidle');
//     console.log('Login complete');
//   }
// }

// module.exports = LoginPage;


// const { getMicrosoftAccountLabel } = require('../env/baseenv');

// class LoginPage {
//   constructor(page) {
//     this.page = page;
//   }

//   /** Clicks “Sign in with Microsoft” and completes account picking in the SSO popup. */
//   async loginWithMicrosoft() {
//     const accountLabel = getMicrosoftAccountLabel();

//     const [popup] = await Promise.all([
//       this.page.waitForEvent('popup'),
//       this.page.getByRole('button', { name: 'Sign in with Microsoft' }).click(),
//     ]);

//     await popup.waitForLoadState('domcontentloaded');
//     console.log('SSO popup opened');
//     await popup.getByText(accountLabel, { exact: true }).click();
//     console.log('Account selected:', accountLabel);
//   }

//   //Runs interactive login only when the sign-in control is shown. 
//   async loginWithMicrosoftIfNeeded() {
//     const signIn = this.page.getByRole('button', { name: 'Sign in with Microsoft' });
//     if (await signIn.isVisible().catch(() => false)) {
//       await this.loginWithMicrosoft();
//     }
//   }
// }

// module.exports = LoginPage;

