const { capitalize } = require("lodash/fp");
const mustache = require("mustache");
const pluralize = require("pluralize");

const format = (template, component, view, partial, tags = ['<%', '%>']) =>
    mustache.render(
        template,
        {
            component,
            Component: capitalize(component),
            components: pluralize(component),
            Components: pluralize(capitalize(component)),
            ...view
        },
        partial,
        tags
    );

module.exports = { format };
