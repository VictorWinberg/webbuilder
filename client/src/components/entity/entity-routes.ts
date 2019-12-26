export default [
  {
    path: "/entities",
    component: () => import("./entity-index.vue"),
    children: [
      {
        name: "entity-list",
        path: "",
        component: () => import("./entity-list.vue")
      },
      {
        name: "entity-show",
        path: ":id",
        component: () => import("./entity-show.vue"),
        props: true
      },
      {
        name: "entity-edit",
        path: ":id/edit",
        component: () => import("./entity-edit.vue"),
        props: true
      }
    ]
  }
];
