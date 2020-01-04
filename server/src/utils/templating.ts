import { capitalize, toUpper, transform } from "lodash";
import Handlebars from "handlebars";
import helpers from "handlebars-helpers";
import { format } from "prettier";
import pluralize from "pluralize";

Handlebars.registerHelper("switch", function(this: any, value, options) {
  this.switch_value = value;
  this.switch_break = false;
  return options.fn(this);
});

Handlebars.registerHelper("case", function(this: any, value, options) {
  if (value == this.switch_value) {
    this.switch_break = true;
    return options.fn(this);
  }
});

Handlebars.registerHelper("default", function(this: any, _, options) {
  if (this.switch_break == false) {
    return options.fn(this);
  }
});

Handlebars.registerHelper(helpers());

function mustachify(obj: any) {
  function iteratee(result: any, value: any, key: string) {
    if (typeof value === "object") {
      result[key] = mustachify(value);
    } else if (typeof value === "string") {
      result[key] = value;
      result[capitalize(key)] = capitalize(value);
      result[toUpper(key)] = toUpper(value);
      result[pluralize(key)] = pluralize(value);
      result[pluralize(capitalize(key))] = pluralize(capitalize(value));
      result[pluralize(toUpper(key))] = pluralize(toUpper(value));
    } else {
      result[key] = value;
    }
  }
  return transform(obj, iteratee);
}

const templating = (template: string, filepath: string, entity: any) =>
  format(Handlebars.compile(template)(mustachify(entity)), { filepath });

export default { templating };
