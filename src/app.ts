import express, { Request, Response } from "express";
import { RequestsWithBody, RequestsWithParams, RequestsWithParamsAndBody, RequestsWithQuery } from "./types";
import {GetCoursesQueryModel} from "./models/GetCoursesQueryModel";
import {CourseUpdateModel} from "./models/CourseUpdateModel";
import {CourseViewModel} from "./models/CourseViewModel";
import {UriParamsCourseIdModel} from "./models/UriParamsCourseIdModel";

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

type CourseType = {
  id: number;
  title: string;
};

const db: { courses: CourseType[] } = {
  courses: [
    { id: 1, title: "JS" },
    { id: 2, title: "Java" },
    { id: 3, title: "C" },
    { id: 4, title: "Python" },
  ],
};

app.get(
  "/courses",
  (
    req:  RequestsWithQuery<GetCoursesQueryModel>, // uriParams resBody reqBody Query
    res: Response<CourseViewModel[]>
  ) => {
    let foundCourses = db.courses;
    if (req.query.title) {
      foundCourses = foundCourses.filter((el) => el.title.indexOf(req.query.title as string) > -1);
    }
    res.json(foundCourses.map(dbCourse => {
      return {
        id: dbCourse.id,
        title: dbCourse.title
      }
    }));
  }
);

app.get("/courses/:id", (req: RequestsWithParams<UriParamsCourseIdModel>, 
                        res: Response<CourseViewModel>) => {
  let searchCourse = db.courses.find((el) => el.id === +req.params.id);

  if (!searchCourse) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  res.json({
    id: searchCourse.id,
    title: searchCourse.title
  });
});

app.post("/courses", (req: RequestsWithBody<{ title: string }>, res: Response<CourseType>) => {
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

app.delete("/courses/:id", (req: RequestsWithParams<UriParamsCourseIdModel>, res: Response) => {
  // если отправляем статус, просто респонс без параметров (выше)
  db.courses = db.courses.filter((el) => el.id !== +req.params.id);
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.put("/courses/:id", (req: RequestsWithParamsAndBody<UriParamsCourseIdModel, CourseUpdateModel>, res: Response) => {
  const searchCourse = db.courses.find((el) => el.id === +req.params.id);
  if (!searchCourse) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  if (!req.body.title || typeof req.body.title !== "string") res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
  searchCourse.title = req.body.title;
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.delete("/__test__/data", (req: Request, res: Response) => {
  db.courses = [];
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
