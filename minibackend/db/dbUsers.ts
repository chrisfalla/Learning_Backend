import { User } from "../model/User";

const users: User[] = [
    {
        id: 1,
        name: "Christofer Falla",
        email: "chris@gmail.com",
        typeId: "Cedula",
        higth: 1.82,
        married: false
    },
    {
        id: 2,
        name: "Lucia Ropero",
        email: "luci@gmail.com",
        typeId: "Cedula",
        higth: 1.75,
        married: false
    },
    {
        id: 3,
        name: "Laura Ropero",
        email: "lau@gmail.com",
        typeId: "Cedula",
        higth: 1.70,
        married: true
    },
    {
        id: 4,
        name: "Jhon Torres",
        email: "jhon@gmail.com",
        typeId: "Cedula",
        higth: 1.72,
        married: true
    },
];

export { users }
