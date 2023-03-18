let { sessionId, serviceCode, phoneNumber, text } = req.body

//     if (text == '') {
//         // This is the first request. Note how we start the response with CON
//         let response = `
//                             CON What would you want to check
//                             1. My Account
//                             2. My phone number
//                         `
//         res.send(response)
//     } else if (text == '1') {
//         // Business logic for first level response
//         let response = `CON Choose account information you want to view
// 1. Account number
// 2. Account balance`
//         res.send(response)
//     } else if (text == '2') {
//         // Business logic for first level response
//         let response = `END Your phone number is ${phoneNumber}`
//         res.send(response)
//     } else if (text == '1*1') {
//         // Business logic for first level response
//         let accountNumber = 'ACC1001'
//         // This is a terminal request. Note how we start the response with END
//         let response = `END Your account number is ${accountNumber}`
//         res.send(response)
//     } else if (text == '1*2') {
//         // This is a second level response where the user selected 1 in the first instance
//         let balance = 'NGN 10,000'
//         // This is a terminal request. Note how we start the response with END
//         let response = `END Your balance is ${balance}`
//         res.send(response)
//     } else {
//         res.status(400).send('Bad request!')
//     }

if (text === '') {
       // This is the first request. Note how we start the response with CON
       res.send(response.init)
}

// Business logic for first level response
else if (text === "1") {
       // transfer
       const user = await User.findOne({ account: phoneNumber });

       if (!user) {
              res.send(response.no_account)
       }
       else {
              res.send("This function is pending...")
       }
}
else if (text === "2") {
       // Acount info
       const user = await User.findOne({ account: phoneNumber });

       if (!user) {
              res.send(response.no_account)
       }
       else {
              res.send(response.account)
       }
}

// Business logic for second level response   res.send(response)
else if (text === "2*1") {
       const user = await User.findOne({ account: phoneNumber });

       if (!user) {
              res.send(response.no_account)
       }
       else {
              res.send(`END Your Account Balance is ${user.currency} ${user.balance}`)
       }
}
else if (text === "2*2") {
       const user = await User.findOne({ account: phoneNumber });

       if (!user) {
              res.send(response.no_account)
       }
       else {
              res.send(`END Your account number is ${user.accountNumber}`)
       }
}
else if (text === "2*3") {
       // create new account
       res.send(`END This function is pending...`)
}