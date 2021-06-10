import express from "express";
import cors from "cors";
import nodemon from "nodemon";

const app = express();
app.use(cors());
app.use(express.json());

const comments = [
  {
    id: 1,
    postId: 1,
    author: "João",
    content: "Muito bom esse post! Tá de parabéns",
  },
];
const posts = [
  {
    id: 1,
    title: "Hello World",
    coverUrl: "https://miro.medium.com/max/1024/1*OohqW5DGh9CQS4hLY5FXzA.png",
    contentPreview: "Esta é a estrutura de um post esperado pelo front-end",
    content:
      "Este é o conteúdo do post, o que realmente vai aparecer na página do post...",
  },
];

app.get("/posts", (req, resp) => {
  console.log("requisição feita de novo mias!");
  for (let i = 0; i < posts.length; i++) {
    let counter = 0;
    for (let j = 0; j < comments.length; j++) {
      if (comments[j].postId === posts[i].id) {
        counter++;
      }
    }
    posts[i].commentCount = counter;
  }
  resp.send(posts);
});

app.get("/posts/:id", (req, resp) => {
  const id = parseInt(req.params.id);
  resp.send(posts.find((post) => post.id === id));
});

app.get("/posts/:id/comments", (req, resp) => {
  const postId = parseInt(req.params.id);
  const postComments = comments.filter((comment) => comment.postId === postId);
  resp.send(postComments);
});
app.post("/posts/:id/comments", (req, resp) => {
  const newComment = req.body;
  newComment.id = comments.length + 1;
  comments.push(newComment);
  resp.send(newComment);
});

app.post("/posts", (req, resp) => {
  const newPost = req.body;
  newPost.commentCount = 0;
  newPost.id = posts.length + 1;
  posts.push(newPost);
  resp.send(posts);
});

app.listen(4000);
