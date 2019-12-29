export default [
  {
    path: "/{{entities}}",
    component: () => import("./{{entity}}-index.vue"),
    children: [
      {
        name: "{{Entity}}List",
        path: "",
        component: () => import("./{{entity}}-list.vue")
      },
      {
        name: "{{Entity}}Show",
        path: ":id",
        component: () => import("./{{entity}}-show.vue"),
        props: true
      },
      {
        name: "{{Entity}}Edit",
        path: ":id/edit",
        component: () => import("./{{entity}}-edit.vue"),
        props: true
      }
    ]
  }
];
