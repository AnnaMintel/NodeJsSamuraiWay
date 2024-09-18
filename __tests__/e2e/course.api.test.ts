import request from "supertest";
import { app, HTTP_STATUSES } from "../../src/app";

describe("/courses", () => {
  beforeAll(async () => {
    await request(app).delete("/__test__/data");
  });

  it("should return 200 and empty array", async () => {
    await request(app).get("/courses").expect(HTTP_STATUSES.OK_200, []);
  });

  it("should return 404 for not existing course", async () => {
    await request(app).get("/courses/1").expect(HTTP_STATUSES.NOT_FOUND_404);
  });

  //not working
  it("shouldn't create course with correct input data", async () => {
    await request(app).post("/courses").send({ title: "" }).expect(HTTP_STATUSES.BAD_REQUEST_400);
    await request(app).get("/courses").expect(HTTP_STATUSES.OK_200, []);
  });

  let createdCourse1: any = null;
  it("should create course with correct input data", async () => {
    const createResponse = await request(app).post("/courses").send({ title: "new course" }).expect(HTTP_STATUSES.CREATED_201);

    createdCourse1 = createResponse.body;

    expect(createdCourse1).toEqual({
      id: expect.any(Number),
      title: "new course",
    });

    await request(app).get("/courses").expect(HTTP_STATUSES.OK_200, [createdCourse1]);
  });

  it("shouldn't update course with incorrect input data", async () => {
    await request(app)
      .put("/courses/" + createdCourse1.id)
      .send({ title: true })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
  });

  it("shouldn't update course with correct input data", async () => {
    await request(app)
      .put("/courses/" + -100)
      .send({ title: "good title" })
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  });

  it("shouldn\'t update course that not exist", async () => {
    await request(app)
      .put("/courses/" + -100)
      .send({ title: "good new title" })
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  });

});
