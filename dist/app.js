"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUSES = exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
exports.HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
};
const jsonBodyMiddleware = express_1.default.json();
exports.app.use(jsonBodyMiddleware);
const db = {
    courses: [
        { id: 1, title: "JS" },
        { id: 2, title: "Java" },
        { id: 3, title: "C" },
        { id: 4, title: "Python" },
    ],
};
exports.app.get("/courses", (req, res) => {
    let foundCourses = db.courses;
    if (req.query.title) {
        foundCourses = foundCourses.filter((el) => el.title.indexOf(req.query.title) > -1);
    }
    res.json(foundCourses);
});
exports.app.get("/courses/:id", (req, res) => {
    const searchCourse = db.courses.find((el) => el.id === +req.params.id);
    if (!searchCourse) {
        res.sendStatus(exports.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.json(searchCourse);
});
exports.app.post("/courses", (req, res) => {
    if (!req.body.title) {
        res.sendStatus(exports.HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const createdCourse = {
        id: +new Date(),
        title: req.body.title,
    };
    db.courses.push(createdCourse);
    res.status(exports.HTTP_STATUSES.CREATED_201).json(createdCourse);
});
exports.app.delete("/courses/:id", (req, res) => {
    db.courses = db.courses.filter((el) => el.id !== +req.params.id);
    res.sendStatus(exports.HTTP_STATUSES.NO_CONTENT_204);
});
exports.app.put("/courses/:id", (req, res) => {
    const searchCourse = db.courses.find((el) => el.id === +req.params.id);
    if (!searchCourse) {
        res.sendStatus(exports.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    if (!req.body.title || typeof req.body.title !== 'string')
        (res.sendStatus(exports.HTTP_STATUSES.BAD_REQUEST_400));
    searchCourse.title = req.body.title;
    res.sendStatus(exports.HTTP_STATUSES.NO_CONTENT_204);
});
exports.app.delete("/__test__/data", (req, res) => {
    db.courses = [];
    res.sendStatus(exports.HTTP_STATUSES.NO_CONTENT_204);
});
