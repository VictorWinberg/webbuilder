import Comment from "./comment";
import CommentList from "./comment-list";
import CommentShow from "./comment-show";
import CommentEdit from "./comment-edit";

const commentRoutes = [
  {
    path: "/comments",
    component: Comment,
    children: [
      {
        name: "comment-list",
        path: "",
        component: CommentList
      },
      {
        name: "comment-show",
        path: ":id",
        component: CommentShow,
        props: true
      },
      {
        name: "comment-edit",
        path: ":id/edit",
        component: CommentEdit,
        props: true
      }
    ]
  }
];

export default commentRoutes;
