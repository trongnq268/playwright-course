export const CartCheckoutLocators = {

    // ============================
    // Home
    // ============================

    homeLogo: 'img[alt="Website for automation practice"]',
    productsBtn: 'a[href="/products"]',
    cartBtn: 'a[href="/view_cart"]',
    signupLoginBtn: 'a[href="/login"]',
    deleteAccountBtn: 'a[href="/delete_account"]',
    continueBtn: '[data-qa="continue-button"]',

    loggedInAs: (username: string) =>
        `text=Logged in as ${username}`,

    // ============================
    // Product List
    // ============================

    // ============================
    // Product
    // ============================

    productCard:
        '.features_items .col-sm-4',

    viewFirstProduct:
        'a[href="/product_details/1"]',

    quantityInput:
        '#quantity',

    addToCartBtn:
        'button.cart',

    continueShoppingBtn:
        'button:has-text("Continue Shopping")',

    viewCartBtn:
        'text=View Cart',

    // ============================
    // Cart
    // ============================

    cartTable:
        '#cart_info',

    firstProductQuantity:
        '#product-1 td.cart_quantity',

    proceedToCheckoutBtn:
        'text=Proceed To Checkout',

    removeProductBtn:
        '.cart_quantity_delete',

    emptyCartText:
        '#empty_cart',

    // ============================
    // Signup
    // ============================

    signupHeader:
        'text=New User Signup!',

    signupName:
        '[data-qa="signup-name"]',

    signupEmail:
        '[data-qa="signup-email"]',

    signupBtn:
        '[data-qa="signup-button"]',

    // ============================
    // Register
    // ============================

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

    mobileNumber:
        '#mobile_number',

    createAccountBtn:
        '[data-qa="create-account"]',

    accountCreated:
        'text=Account Created!',

    accountDeleted:
        'text=Account Deleted!',

    // ============================
    // Checkout
    // ============================

    registerLoginBtn:
        'text=Register / Login',

    deliveryAddress:
        '#address_delivery',

    billingAddress:
        '#address_invoice',

    reviewOrder:
        '#cart_info',

    commentTextArea:
        'textarea[name="message"]',

    placeOrderBtn:
        'a:has-text("Place Order")',

    // ============================
    // Payment
    // ============================

    nameOnCard:
        '[data-qa="name-on-card"]',

    cardNumber:
        '[data-qa="card-number"]',

    cvc:
        '[data-qa="cvc"]',

    expiryMonth:
        '[data-qa="expiry-month"]',

    expiryYear:
        '[data-qa="expiry-year"]',

    payConfirmBtn:
        '[data-qa="pay-button"]',

    orderSuccess:
        'text=Your order has been placed successfully!'
};