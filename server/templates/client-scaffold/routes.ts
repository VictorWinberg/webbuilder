export default [
  {
    path: "/<%components%>",
    component: () => import("./<%component%>-index.vue"),
    children: [
      {
        name: "<%component%>-list",
        path: "",
        component: () => import("./<%component%>-list.vue")
      },
      {
        name: "<%component%>-show",
        path: ":id",
        component: () => import("./<%component%>-show.vue"),
        props: true
      },
      {
        name: "<%component%>-edit",
        path: ":id/edit",
        component: () => import("./<%component%>-edit.vue"),
        props: true
      }
    ]
  }
];
