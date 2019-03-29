import db from '../../db';

const services = async () => {
    try{
        return  await db.select('*').from('services');
    } catch (e){
        throw e
    }
}

export {services}