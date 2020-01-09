export default [
  {
    path: "/entities",
    meta: { name: "Entities", static: true, icon: "cog" },
    component: (): Promise<{}> => import("./entity-index.vue"),
    children: [
      {
        name: "EntityList",
        path: "",
        component: (): Promise<{}> => import("./entity-list.vue")
      },
      {
        name: "EntityShow",
        path: ":name",
        component: (): Promise<{}> => import("./entity-show.vue"),
        props: true
      },
      {
        name: "EntityEdit",
        path: ":name/edit",
        component: (): Promise<{}> => import("./entity-edit.vue"),
        props: true
      }
    ]
  }
];
