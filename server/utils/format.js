const mustache = require("mustache");

const format = (template, view, partial, tags=['<%', '%>']) => mustache.render(template, view, partial, tags);

module.exports = { format };
