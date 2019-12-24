import request from "supertest";
import app from "./app";

describe("Test the api paths", () => {
  test("Entities should response the GET method", async () => {
    const response = await request(app).get("/api/entities");
    expect(response.status).toBe(200);
  });

  test("Entities should response the POST method", async () => {
    const response = await request(app)
      .post("/api/entities")
      .send([]);
    expect(response.status).toBe(200);
  });

  test("Build should response the GET method", async () => {
    const response = await request(app).get("/api/build");
    expect(response.status).toBe(200);
  });
});
