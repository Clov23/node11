const UserController = require("./user-controller");
const User = require("./user");

let userController;

beforeEach(() => {
  userController = new UserController();
});

test('add user that is not already in the list', () => {
  const user = new User(1234, "Santiago", "santiago@generation.org");
  userController.add(user);
  expect(userController.getUsers()).toContain(user);
});

test('remove user that is not in the list keeps list unchanged', () => {
  const existingUser = new User(1234, "Santiago", "santiago@generation.org");
  const missingUser = new User(9876, "Maria", "maria@generation.org");
  userController.add(existingUser);

  userController.remove(missingUser);

  expect(userController.getUsers()).toHaveLength(1);
  expect(userController.getUsers()).toContain(existingUser);
});

test('findByEmail returns user when email exists', () => {
  const user = new User(1234, "Santiago", "santiago@generation.org");
  userController.add(user);

  expect(userController.findByEmail("santiago@generation.org")).toBe(user);
});

test('findByEmail returns undefined when email does not exist', () => {
  const user = new User(1234, "Santiago", "santiago@generation.org");
  userController.add(user);

  expect(userController.findByEmail("no-existe@generation.org")).toBeUndefined();
});

test('findById returns user when id exists', () => {
  const user = new User(1234, "Santiago", "santiago@generation.org");
  userController.add(user);

  expect(userController.findById(1234)).toBe(user);
});

test('findById returns undefined when id does not exist', () => {
  const user = new User(1234, "Santiago", "santiago@generation.org");
  userController.add(user);

  expect(userController.findById(9999)).toBeUndefined();
});

