const { User, Category, Role, Product } = require('../models');

const isValidRole = async (role = "") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`El rol ${role} no está registrado en la DB`);
  }
};

const emailExists = async (email = "") => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error(`El email ${email} ya está registrado en la DB`);
  }
};

const userByIdExists = async (id = "") => {
  const userExists = await User.findById(id);
  if (!userExists) {
    throw new Error(`El id ${id} no existe en la DB`);
  }
};

const categoryByIdExists = async (id = "") => {
  const categoryExists = await Category.findById(id);
  if (!categoryExists) {
    throw new Error(`El id ${id} no existe en la DB`);
  }
};

const productByIdExists = async (id = "") => {
  const productExists = await Product.findById(id);
  if (!productExists) {
    throw new Error(`El id ${id} no existe en la DB`);
  }
};

module.exports = {
  isValidRole,
  emailExists,
  userByIdExists,
  categoryByIdExists,
  productByIdExists,
};
