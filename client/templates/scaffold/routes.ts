export default [
  {
    path: "/{{entities}}",
    meta: { name: "{{Entities}}", static: false },
    component: (): Promise<{}> => import("./{{entity}}-index.vue"),
    children: [
      {
        name: "{{Entity}}List",
        path: "",
        meta: { name: "List", static: false },
        component: (): Promise<{}> => import("./list/{{entity}}-list.vue")
      },
      {
        name: "{{Entity}}New",
        path: "new",
        meta: { name: "New", static: false },
        component: (): Promise<{}> => import("./new/{{entity}}-new.vue"),
        props: true
      },
      {
        name: "{{Entity}}Show",
        path: ":id",
        component: (): Promise<{}> => import("./show/{{entity}}-show.vue"),
        props: true
      },
      {
        name: "{{Entity}}Edit",
        path: ":id/edit",
        component: (): Promise<{}> => import("./edit/{{entity}}-edit.vue"),
        props: true
      }
    ]
  }
];
