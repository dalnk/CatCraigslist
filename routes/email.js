// pubkey-6420796708affd751d8e379eafe61a67

const nodemailer = require('nodemailer')
const mailgunTransport = require('nodemailer-mailgun-transport')

const mailgunOptions = {
  auth: {
    api_key: "key-035b3645c25bc5f9b952a4c371b362d1",
    domain: "mail.alnk.me"
  }
}

const transport = mailgunTransport(mailgunOptions)

class EmailService {
  constructor() {
    this.emailClient = nodemailer.createTransport(transport)
  }

  sendText(to, subject, text) {
    return new Promise((resolve, reject) => {
      this.emailClient.sendMail({
        from: 'Cat Captain <dennis@mail.alnk.me>',
        to,
        subject,
        text,
      }, (err, info) => {
        if(err) {
          reject(err)
        } else {
          resolve(info)
        }
      })
    })
  }
}

module.exports = new EmailService()
