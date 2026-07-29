export const AuthLocators = {

    // Home
    homeLogo: 'img[alt="Website for automation practice"]',
    signupLoginBtn: 'a[href="/login"]',
    continueBtn: '[data-qa="continue-button"]',
    deleteAccountBtn: 'a[href="/delete_account"]',

    loggedInAs: (username: string) =>
        `text=Logged in as ${username}`,

    // Signup

    signupHeader: 'text=New User Signup!',
    signupName: '[data-qa="signup-name"]',
    signupEmail: '[data-qa="signup-email"]',
    signupBtn: '[data-qa="signup-button"]',

    existingEmailError:
        'text=Email Address already exist!',

    // Login

    loginHeader:
        'text=Login to your account',

    loginEmail:
        '[data-qa="login-email"]',

    loginPassword:
        '[data-qa="login-password"]',

    loginBtn:
        '[data-qa="login-button"]',

    loginError:
        'text=Your email or password is incorrect!',

    // Account Information

    accountInfoHeader:
        'text=Enter Account Information',

    mrRadio:
        '#id_gender1',

    mrsRadio:
        '#id_gender2',

    password:
        '#password',

    day:
        '#days',

    month:
        '#months',

    year:
        '#years',

    newsletter:
        '#newsletter',

    specialOffer:
        '#optin',

    firstName:
        '#first_name',

    lastName:
        '#last_name',

    company:
        '#company',

    address1:
        '#address1',

    address2:
        '#address2',

    country:
        '#country',

    state:
        '#state',

    city:
        '#city',

    zipcode:
        '#zipcode',

    mobile:
        '#mobile_number',

    createAccount:
        '[data-qa="create-account"]',

    accountCreated:
        'text=Account Created!',

    accountDeleted:
        'text=Account Deleted!'
};