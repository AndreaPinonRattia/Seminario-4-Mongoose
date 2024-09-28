const mongoose = require('mongoose');

// Connection
mongoose.connect('mongodb://localhost:27017/ea-mongoose')
  .catch((error) => console.log(error));

// Madel and Interface
import { IUser, UserModel } from './models/User';
import { ITodo, TodoModel } from './models/Todo';
import { getUsers } from './models/User';
import { createUser } from './models/User';
import { getUserById } from './models/User';
import { updateUser } from './models/User';
import { deleteUser } from './models/User';

//CREAR
const createNewUser = async () => {
  try {
    const newUser: IUser = {
      "id": 3,
      "name": "Pep Pop",
      "username": "Bret",
      "email": "pep@gmail.com",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
       "zipcode": "92998-3874",
       "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
    }
};
const createdUser = await createUser(newUser); 
console.log("Usuario creado:", createdUser); 
} catch (error) {
console.error("Error creando usuario:", error);
}
};

createNewUser();

//LISTAR
const showUsersInConsole = async () => {
  try {
    const users = await getUsers(); 
    console.log("Lista de usuarios:", users); 
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
  }
};

showUsersInConsole();

//VER 
const showUsersByIDInConsole = async (userid:number) => {
  try {
    const user = await getUserById(userid); 
    if (user) {
      console.log("Usuario encontrado:", user);
    } else {
      console.log("Usuario no encontrado.");
    }
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
  }
};

showUsersByIDInConsole(4);

//BORRAR
const deleteUserByID = async (userid: number) => {
  try {
    const del = await deleteUser(userid); 
    if (del) {
      console.log("Usuario borrado:", del);
    } else {
      console.log("Usuario no encontrado.");
    }
  } catch (error) {
    console.error("Error borrando usuario:", error);
  }
};

deleteUserByID(2);

//EDITAR
const updateUserByID = async (userid: number, userData: Partial<IUser>) => {
  try {
    const edit = await updateUser(userid, userData); 
    if (edit) {
      console.log("Usuario actualizado:", edit);
    } else {
      console.log("Usuario no encontrado.");
    }
  } catch (error) {
    console.error("Error actualizando usuario:", error);
  }
};

updateUserByID(1, { name: "John", email: "john@example.com" });;

//Aggregation Pipeline
const aggregateLikesByCompanyName = async () => {
  try {
    const result = await UserModel.aggregate([
      {
        $match: { id: { $gt: 0 } } 
      },
      {
        $group: {
          _id: "$company.name", 
          totalId: { $sum: "$id" } 
        }
      }
    ]);

    console.log("Resultado de la agregación:", result); 
  } catch (error) {
    console.error("Error en la agregación:", error);
  }
};

aggregateLikesByCompanyName();