import { capitalize } from "lodash/fp";
import mustache from "mustache";
import pluralize from "pluralize";

const format = (
  template: string,
  component: string,
  view: any,
  partial?: any,
  tags: string[] = ["<%", "%>"]
) =>
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

export default { format };
