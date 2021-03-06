import db from "../../db";
import jwt from "../../dependencies";
const bcrypt = require("bcryptjs");

interface UserData {
  email: String;
  password: String;
  firstName: String;
  lastName: String;
  phone: String;
}
//TODO add input validation
export const register = async ({ userInput } : {userInput: UserData}) => {
  const newUser: UserData = userInput;
  if(
    newUser.email!=="" 
    && newUser.password !==""
    && newUser.firstName !==""
    && newUser.lastName !==""
    && newUser.phone !==""
    ){
    try {
      const doesExist = await db
        .select("email")
        .from("users")
        .where("email", "=", newUser.email);
      if (doesExist.length === 0) {
        const hashedPassword = await bcrypt.hash(newUser.password, 12);
        const userData = {
          email: newUser.email,
          password: hashedPassword,
          status: "user"
        };
        const status = await db.transaction(async (trx : any) => {
          try {
            const createdUser = await trx("users")
              .insert(userData)
              .returning("*");
            const customerData = {
              firstname: newUser.firstName,
              lastname: newUser.lastName,
              phone: newUser.phone,
              idc: createdUser[0].idu,
              joined: new Date()
            };
            const createdCustomer = await trx("customers")
              .insert(customerData)
              .returning("*");
            trx.commit;
            return true;
          } catch (e) {
            trx.rollback;
            return false;
          }
        });
        return status;
      }
      else {
        return false;
      }
    } catch (e) {
      throw e;
    }
  }
  else {
    return false;
  }
};
//TODO add tokens
export const login = async ({
  email,
  password
}: {
  email: String;
  password: String;
}) => {
  try {
    const userCredencials = await db
      .select("email", "password")
      .from("users")
      .where({ email });
    if (userCredencials.length > 0) {
      const storedPassword : String = userCredencials[0].password;
      if (bcrypt.compareSync(password, storedPassword)) {
        const userData = await db
          .select("*")
          .from("users")
          .leftJoin("customers","users.idu","customers.idc")
          .where({ email });
        const token = jwt.sign(
          {
            userId: userData[0].idu,
            email: userData[0].email
          },
          "supersecretkey",
          {
            expiresIn: '1h'
          }
        )
        return {
          firstName: userData[0].firstname,
          token: token,
          tokenExpiration: 1
        };
      }
      else {
        return null;
      }
    }
  } catch (e) {
    console.log(e);
    return false
  }
};

export const verifyAdmin = async (token : String) : Promise<boolean> => {
  if(token.length > 0) {
    const userData = jwt.verify(token, "supersecretkey")
    try {
      const admin = await db.select("*").from("users").where("status", "admin")
      if(userData.userId === admin[0].idu){
        return true
      }
    } catch (err) {
      console.log(err)
      return false
    }
  } else return false
}
