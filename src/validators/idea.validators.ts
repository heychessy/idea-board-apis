import { check } from "express-validator";
export class IdeaValidators {
  updateIdeaValidators = () => [
    check("id")
      .exists()
      .isString()
      .notEmpty(),
    check("title")
      .exists()
      .isString()
      .notEmpty(),
    check("description")
      .exists()
      .isString()
      .notEmpty()
  ];
  createIdeaValidators = () => [
    check("title")
      .exists()
      .isString()
      .notEmpty(),
    check("description")
      .exists()
      .isString()
      .notEmpty()
  ];
}
