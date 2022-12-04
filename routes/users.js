const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { isValidRole, emailExists, userByIdExists } = require('../helpers/db-validators');
const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet);

router.post(
  "/",
  [
    check("email", "El correo no es válido").isEmail(),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    // check('role', 'No es un rol válido').isIn(['USER_ROLE', 'ADMIN_ROLE']),
    check("role").custom(isValidRole),
    check("email").custom(emailExists),
    validateFields,
  ],
  usersPost
);

router.put("/:id", [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(userByIdExists),
  check("role").custom(isValidRole),
  validateFields
],
 usersPut);

router.delete("/:id", [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(userByIdExists),
  // check("role").custom(isValidRole),
  validateFields
  ], 
  usersDelete
);

router.patch("/", usersPatch);

module.exports = router;
