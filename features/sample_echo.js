/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = function (controller) {
  controller.hears("sample", "message,direct_message", async (bot, message) => {
    await bot.reply(message, "I heard a sample message.");
  });

  controller.on("message,direct_message", async (bot, message) => {
    await bot.reply(message, `Echo: ${message.text}`);
  });

  //   let bot = await controller.spawn({
  //     token: process.env.BOT_TOKEN,
  //   });
  // controller.ready(async () => {
  //   console.log("stuff");
  //   let bot = await controller.spawn({
  //     token: process.env.BOT_TOKEN,
  //   });
    // console.log(bot);
    // await bot.say({
    //   text: "test",
    //   channel: "#slackbot-testing",
    // });
    // await bot.say('hello');
    // await bot.api.channels.list({}, (err, response) => {
    //   console.log('hello?')
    //       console.log(response.channels);
    //     });
  // });
};
