import { capitalize, toUpper, isEmpty, transform, merge } from "lodash";
import handlebars from "handlebars";
import pluralize from "pluralize";

function mustachify(obj: any) {
  function iteratee(result: any, value: any, key: string) {
    if (typeof value === "object") {
      result[key] = mustachify(value);
      if (typeof key === "string") {
        result[`has${capitalize(key)}`] = !isEmpty(value);
      }
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

const templating = (template: string, entity: any) =>
  handlebars.compile(template)(mustachify(entity));

export default { templating };
