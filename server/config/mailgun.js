/*
Commenting out as i dont think i will need this.
const config = require('./main');
const mailgun = require('mailgun-js')({ apiKey: config.mailgun_priv_key,
  domain: config.mailgun_domain });

// Create and export function to send emails through Mailgun API
exports.sendEmail = function (recipient, message) {
  const data = {
    from: 'Your Site <info@yourdomain.com>',
    to: recipient,
    subject: message.subject,
    text: message.text
  };

  mailgun.messages().send(data, (error, body) => {
    //  console.log(body);
  });
};

exports.contactForm = function (sender, message) {
  const data = {
    from: sender,
    to: 'babineau.james@gmail.com',
    subject: message.subject,
    text: message.text
  };

  mailgun.messages().send(data, (error, body) => {
  //  console.log(body);
  });
};
*/