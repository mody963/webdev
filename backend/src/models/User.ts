class User {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

const users = [
  new User(1, 'Jurn'),
  new User(2, 'Karlijn')
];

function getAllUsers(): User[] {
  return users;
}

function getUserById(id: number): User | undefined {
  return users.find(user => user.id === id);
}

export { User, users, getAllUsers, getUserById };