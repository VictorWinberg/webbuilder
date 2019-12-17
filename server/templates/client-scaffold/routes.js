import <%Component%> from "./<%component%>-index";
import <%Component%>List from "./<%component%>-list";
import <%Component%>Show from "./<%component%>-show";
import <%Component%>Edit from "./<%component%>-edit";

const <%component%>Routes = [
  {
    path: "/<%components%>",
    component: <%Component%>,
    children: [
      {
        name: "<%component%>-list",
        path: "",
        component: <%Component%>List
      },
      {
        name: "<%component%>-show",
        path: ":id",
        component: <%Component%>Show,
        props: true
      },
      {
        name: "<%component%>-edit",
        path: ":id/edit",
        component: <%Component%>Edit,
        props: true
      }
    ]
  }
];

export default <%component%>Routes;
