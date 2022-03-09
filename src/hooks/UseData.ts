import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type FirebaseData = Record<
  string,
  {
    name: string;
    email: string;
  }
>;

type Data = {
  id: string;
  name: string;
  email: string;
};


export function UseData() {
    const [data, setNewData] = useState<Data[]>([]);

    useEffect(() => {
        const userRef = database.ref(`users`).limitToFirst(5);

        userRef.on("value", (user) => {
          const databaseUser = user.val();
          const firebaseData: FirebaseData = databaseUser ?? {};

           const parsedData = Object.entries(firebaseData).map(([key, value]) => {
               return {
                   id: key,
                   name: value.name,
                   email: value.email,
               };
           });

           setNewData(parsedData);
       });
        
    }, []);

  return({data})
}
