
import db from '../../db';


const barbers = async () => {
        try {
            const barbers : Array<Barber> = await db.select('*').
                                    from('barbers');
            return barbers.map((barber : Barber) => {
                return {
                    IdB: barber.idb,
                    name: barber.name,
                    firstName: barber.firstname,
                    lastName: barber.lastname,
                    phone: barber.phone,
                    email: barber.email,
                }
            })
        } catch(e){
            throw e
        }
}

export {barbers}