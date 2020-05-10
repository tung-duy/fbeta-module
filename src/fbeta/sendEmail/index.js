"use strict";
const fs = require("fs");
const hogan = require("hogan.js");
const striptags = require("striptags");
const Joi = require("joi");
const { createTransport } = require("nodemailer");
const { merge } = require('lodash');

const renderPartFromFile = (template, items) => {
  const partialParts = {
    footer: fs.readFileSync(`${__dirname}/templates/_footer.html`).toString(),
    header: fs.readFileSync(`${__dirname}/templates/_header.html`).toString(),
  };
  const bodyTmp = hogan.compile(template);
  const out = bodyTmp.render(items, partialParts);
  return out;
};

const sendEmail = (emailData, config) => {
  let defaultConfig = {
    host: process.env.HOST_SENDER,
    user: process.env.USER_SENDER,
    pass: process.env.PASS_SENDER,
    port: process.env.PORT_SENDER
  }
  if (typeof config === 'object') {
    defaultConfig = merge(defaultConfig, config);
  }
  const { template, subject, email, data: content, sender, cc } = emailData;

  const errors = { success: false };

  const schema = Joi.object().keys({
    template: Joi.string().required().label("Template"),
    subject: Joi.string().required().label("Subject"),
    email: Joi.string().email({ minDomainAtoms: 2 }).required().label("Email"),
    data: Joi.object(),
    sender: Joi.string(),
    cc: Joi.string(),
    port: Joi.number().min(2).required().label("Port"),
    host: Joi.string().min(2).required().max(32).label("Host"),
    user: Joi.string().required().label("User"),
    pass: Joi.string().required().label("Password"),
  });

  const result = Joi.validate(
    { ...emailData, ...defaultConfig },
    schema,
    {
      abortEarly: false,
    }
  );

  if (result.error) {
    result.error.details.map((index) => {
      const name = index.path[0];
      const message = index.message.replace(/"/g, "");
      if (errors[name] == null) {
        errors[name] = message;
      }
    });
    return errors;
  }

  const transporter = createTransport({
    port: defaultConfig.port,
    host: defaultConfig.host,
    auth: {
      user: defaultConfig.user,
      pass: defaultConfig.pass,
    },
  });
  let message;
  try {
    const templateFile = fs
      .readFileSync(`${__dirname}/templates/${template}`)
      .toString();
    message = renderPartFromFile(templateFile, content);
  } catch (e) {
    message = template;
  }

  const dataPost = {
    from: sender ? sender : "FPT VPN <fpt.work@fpt.com.vn>",
    to: email,
    subject,
    text: striptags(message),
    html: message,
  };

  cc ? (dataPost.cc = cc) : undefined;

  return new Promise((resolve, reject) => {
    if (!email) {
      reject(new Error("User email in undefined"));
    }

    if (!subject) {
      reject(new Error("Email must have letter subject"));
    }

    if (!message || message.length === 0) {
      reject(new Error("Email message is empty"));
    }
    return transporter.sendMail(dataPost, (err, response) => {
      if (err) {
        return reject(err);
      }
      console.log(`FWK ---->: Send ${subject} email successfully!`);
      return resolve(response);
    });
  });
};

module.exports = sendEmail;
