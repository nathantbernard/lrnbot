 var _ = require('lomath');
 var API = require(__dirname + '/API.js')
 var bot = function(token, webhookUrl) {
     API.apply(this, arguments);
     this.setWebhook(webhookUrl || 'https://quiet-shore-48702.herokuapp.com/');
 }
 bot.prototype = API.prototype;
 bot.prototype.constructor = bot;


/**
 * Handles a Telegram Update object sent from the server. Extend this method for your bot.
 * 
 * @category Bot
 * @param {Object} req The incoming HTTP request.
 * @param {Object} res The HTTP response in return.
 * @returns {Promise} promise A promise returned from calling Telegram API method(s) for chaining.
 *
 * @example
 * var bot1 = new bot('yourtokenhere');
 * ...express server setup
 * app.route('/')
 *  robot API as middleware
 * .post(function(req, res) {
 *     bot1.handle(req, res)
 * })
 *  Then bot will handle the incoming Update from you, routed from Telegram!
 * 
 */
 bot.prototype.handle = function(req, res) {
     var Update = req.body,
         Message = Update.message,
         user_id = Message.from.id,
         chat_id = Message.chat.id;

     bot.onText(/\/echo (.+)/, function (msg, match) {
  		var fromId = msg.from.id;
  		var resp = match[1];
  		bot.sendMessage(fromId, resp);
	});
     this.sendMessage(chat_id, "you said: " + Message.text);

 };

 module.exports = bot;