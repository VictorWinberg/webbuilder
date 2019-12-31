export default [
  {
    path: "/{{entities}}",
    meta: "{{Entities}}",
    component: (): Promise<{}> => import("./{{entity}}-index.vue"),
    children: [
      {
        name: "{{Entity}}List",
        path: "",
        component: (): Promise<{}> => import("./{{entity}}-list.vue")
      },
      {
        name: "{{Entity}}Show",
        path: ":id",
        component: (): Promise<{}> => import("./{{entity}}-show.vue"),
        props: true
      },
      {
        name: "{{Entity}}Edit",
        path: ":id/edit",
        component: (): Promise<{}> => import("./{{entity}}-edit.vue"),
        props: true
      }
    ]
  }
];
