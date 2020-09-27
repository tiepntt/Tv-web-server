export const swagger = {
  info: {
    title: "Node Swagger API",
    version: "1.0.0",
    description: "Demonstrating how to describe a RESTful API with Swagger",
    server: ["http:localhost:3001"],
  },
  host: "localhost:3001",
  basePath: "/",
  swagger: "2.0",

  paths: {
    "/book/{IdBook}": {
      get: {
        parameters: [
          {
            type: "integer",
            name: "IdBook",
            in: "path",
            required: true,
            "x-nullable": false,
            format: "int32",
          },
        ],
        responses: {
          "200": {
            description: "",
            schema: {
              type: "array",
              items: {
                type: "string",
              },
            },
            "x-nullable": true,
          },
        },
      },
    },
  },
  definitions: {},
  responses: {},
  parameters: {},
  securityDefinitions: {},
};
