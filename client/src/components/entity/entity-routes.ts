export default [
  {
    path: "/entities",
    meta: { name: "Entities", static: true },
    component: () => import("./entity-index.vue"),
    children: [
      {
        name: "EntityList",
        path: "",
        component: () => import("./entity-list.vue")
      },
      {
        name: "EntityShow",
        path: ":name",
        component: () => import("./entity-show.vue"),
        props: true
      },
      {
        name: "EntityEdit",
        path: ":name/edit",
        component: () => import("./entity-edit.vue"),
        props: true
      }
    ]
  }
];
