import db from "../../db";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

interface UserData {
  email: String;
  password: String;
  firstName: String;
  lastName: String;
  phone: String;
}
//TODO add input validation
const register = async ({ userInput }) => {
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
        const user = await db.transaction(async trx => {
          try {
            const createdUser = await trx("users")
              .insert(userData)
              .returning("*");
            const customerData = {
              firstname: newUser.firstName,
              lastname: newUser.lastName,
              phone: newUser.phone,
              idu: createdUser[0].idu,
              joined: new Date()
            };
            const createdCustomer = await trx("customers")
              .insert(customerData)
              .returning("*");
            trx.commit;
            return {
              idU: createdUser[0].idu,
              email: createdUser[0].email,
              firstName: createdCustomer[0].firstname,
              lastName: createdCustomer[0].lastname,
              phone: createdCustomer[0].phone
            };
          } catch (e) {
            trx.rollback;
            throw e;
          }
        });
        return {
          ...user
        };
      }
    } catch (e) {
      throw e;
    }
  }
};
//TODO add tokens
const login = async ({
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
          .leftJoin("customers","users.idu","customers.idu")
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
    }
  } catch (e) {
    console.log(e);
  }
};

export { register, login };
