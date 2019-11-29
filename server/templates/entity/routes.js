import <%Name%> from "./<%name%>-index";
import <%Name%>List from "./<%name%>-list";
import <%Name%>Show from "./<%name%>-show";
import <%Name%>Edit from "./<%name%>-edit";

const <%name%>Routes = [
  {
    path: "/<%names%>",
    component: <%Name%>,
    children: [
      {
        name: "<%name%>-list",
        path: "",
        component: <%Name%>List
      },
      {
        name: "<%name%>-show",
        path: ":id",
        component: <%Name%>Show,
        props: true
      },
      {
        name: "<%name%>-edit",
        path: ":id/edit",
        component: <%Name%>Edit,
        props: true
      }
    ]
  }
];

export default <%name%>Routes;
