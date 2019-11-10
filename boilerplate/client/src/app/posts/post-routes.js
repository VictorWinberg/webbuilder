import Post from "./post";
import PostList from "./post-list";
import PostShow from "./post-show";
import PostEdit from "./post-edit";

const postRoutes = [
  {
    path: "/posts",
    component: Post,
    children: [
      {
        name: "post-list",
        path: "",
        component: PostList
      },
      {
        name: "post-show",
        path: ":id",
        component: PostShow,
        props: true
      },
      {
        name: "post-edit",
        path: ":id/edit",
        component: PostEdit,
        props: true
      }
    ]
  }
];

export default postRoutes;
