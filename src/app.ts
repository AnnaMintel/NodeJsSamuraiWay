import express from "express";

export const app = express();

export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
};

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

const db = {
  courses: [
    { id: 1, title: "JS" },
    { id: 2, title: "Java" },
    { id: 3, title: "C" },
    { id: 4, title: "Python" },
  ],
};

app.get("/courses", (req, res) => {
  let foundCourses = db.courses;
  if (req.query.title) {
    foundCourses = foundCourses.filter((el) => el.title.indexOf(req.query.title as string) > -1);
  }
  res.json(foundCourses);
});

app.get("/courses/:id", (req, res) => {
  const searchCourse = db.courses.find((el) => el.id === +req.params.id);

  if (!searchCourse) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  res.json(searchCourse);
});

app.post("/courses", (req, res) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }
  const createdCourse = {
    id: +new Date(),
    title: req.body.title,
  };
  db.courses.push(createdCourse);
  res.status(HTTP_STATUSES.CREATED_201).json(createdCourse);
});

app.delete("/courses/:id", (req, res) => {
  db.courses = db.courses.filter((el) => el.id !== +req.params.id);
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.put("/courses/:id", (req, res) => {
  const searchCourse = db.courses.find((el) => el.id === +req.params.id);
  if (!searchCourse) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  if(!req.body.title || typeof req.body.title !== 'string')(
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
  )
  searchCourse.title = req.body.title;
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.delete("/__test__/data", (req, res) => {
  db.courses = [];
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
