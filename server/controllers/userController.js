export const getAllUsers = (req, res) => {
  const users = [
    { id: 1, name: "Ayushi" },
    { id: 2, name: "Riya" },
    { id: 3, name: "Ankit" },
  ];

  res.json(users);
};

