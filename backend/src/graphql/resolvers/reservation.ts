import db from "../../db";
import jwt from "../../dependencies";
import { resolve, reject, any } from "bluebird";
const moment = require("moment");

interface ReservationData {
  date: string;
  IdB: number;
  IdS: number;
  comment: string;
}

enum DaysInWeek {
  monday = 1,
  tuesday = 2,
  wednesday = 3,
  thursday = 4,
  friday = 5,
  saturday = 6,
  sunday = 7
}

const getStartAndFinishHour = (day: number) => {
  switch (day) {
    case DaysInWeek.monday:
      return {
        start: 8,
        finish: 22
      };
    case DaysInWeek.tuesday:
    case DaysInWeek.wednesday:
      return {
        start: 8,
        finish: 20
      };
    case DaysInWeek.thursday:
    case DaysInWeek.friday:
      return {
        start: 8,
        finish: 21
      };
    case DaysInWeek.saturday:
      return {
        start: 8,
        finish: 16
      };
    default:
      return null;
  }
};

const getWorkingTime = (day: number): number => {
  switch (day) {
    case DaysInWeek.monday:
      return (22 - 8) * 60;
    case DaysInWeek.tuesday:
    case DaysInWeek.wednesday:
      return (20 - 8) * 60;
    case DaysInWeek.thursday:
    case DaysInWeek.friday:
      return (21 - 8) * 60;
    case DaysInWeek.saturday:
      return (16 - 8) * 60;
    default:
      return 0;
  }
};

const getAvaliableReservationsDay = async (
  date: string,
  duration: number,
  barberId: number,
  day: number
) => {
  const month = new Date(date).getMonth() + 1;
  const dayWorkingTime = getWorkingTime(day);
  return db
    .select(db.raw("min(extract(day from reservationDate)) as day"))
    .from("reservation")
    .innerJoin("services", "services.ids", "reservation.ids")
    .where("idb", barberId)
    .andWhere(db.raw("extract(month from reservationDate) = ?", [month]))
    .andWhere(db.raw("reservationDate >= current_date"))
    .andWhere(db.raw("extract(day from reservationDate) = ?", [day]))
    .having(db.raw("? - sum(duration) < ?", [dayWorkingTime, duration]));
};

const getAvaliableReservationsMonth = async (
  date: string,
  duration: number,
  barberId: number
) => {
  return new Promise(async (resolve, reject) => {
    const fullyBookedDaysPromises = Object.keys(DaysInWeek)
      .filter(k => typeof DaysInWeek[k as any] === "number")
      .map(k => DaysInWeek[k as any])
      .map(day =>
        getAvaliableReservationsDay(date, duration, barberId, Number(day))
      );
    const fullyBookedDays = await Promise.all([...fullyBookedDaysPromises])
      .then(days => days.reduce((prev, curr) => prev.concat(curr), []))
      .catch(console.log);
    
    const avaliableDays = getAvaliableDaysInMonth(fullyBookedDays, date);
    if (avaliableDays) resolve(avaliableDays);
    else reject("error getting free days");
  });
};

const getAvaliableDaysInMonth = (
  fullyBookedDays: Array<number>,
  date: string
) => {
  const daysInMonth = moment(date).daysInMonth();
  const avaliableDays = [];
  const today = new Date();
  for (let index = 1; index <= daysInMonth; index++) {
    const day = moment(date).date(index)
    if (!fullyBookedDays.includes(index) && today <= day) {
        
      avaliableDays.push(day.format("YYYY-MM-DD"));
    }
  }
  return avaliableDays;
};

export const freeReservationsMonth = async ({barberId, serviceId, date} : any) => {
    try{
        let duration = await db
        .select("duration")
        .from("services")
        .where("ids", serviceId)
        duration = duration[0].duration
        const avaliableDays = await getAvaliableReservationsMonth(
          date,
          duration,
          barberId
        );
        return avaliableDays;
    }catch(error){
        return error
    }
};

const allWorkingHoursInDay = (date: any) : Promise<Array<any>> => {
    return new Promise((resolve, reject) => {
        const {start, finish} = getStartAndFinishHour(parseInt(moment(date).format("E")));
        const workingHour = moment(date).hour(start)
        const endHour = moment(date).hour(finish)
        const workingHours = []
        while (workingHour.isBefore(endHour)) {
            workingHours.push(workingHour.clone())
            workingHour.add(15, 'm')
        }
        //workingHours.forEach(hour => console.log(hour.hour()))
        if(workingHours.length > 0)
            resolve(workingHours)
        else
            reject("error creting working hours in day")
    })
}

const allTakenHoursInDay = (reservations: any) => {
    return new Promise((resolve, reject) => {
        const takenHours = reservations.map((reservation: any) => {
            const {reservationdate, duration} = reservation
            const reservationHours = []
            const reservationStart = moment(reservationdate)
            const reservationEnd = moment(reservationdate).add(duration, 'm')
            const takenHour = moment(reservationStart);
            while(takenHour.isBefore(reservationEnd)){
                reservationHours.push(takenHour.clone())
                takenHour.add(15, 'm')
            }
            return reservationHours
        })
        if(takenHours.length > 0){
            const result = takenHours.reduce((prev: any, curr: any) => prev.concat(curr))
            resolve(result)
        }
        else if(takenHours){
            resolve(takenHours)
        }
        else
            reject("error getting taken hours")
    })
}

export const freeReservationsDay = async ({barberId,serviceId, date} : any) => {
  //const reservationDate = moment("2019-05-06")
  const day = parseInt(moment(date).format("D"));
  let duration = await db
    .select("duration")
    .from("services")
    .where("ids", serviceId)
  duration = duration[0].duration - 15
  const reservations = db
    .select("reservationdate", "duration")
    .from("reservation")
    .innerJoin("services", "services.ids", "reservation.ids")
    .where("idb", barberId)
    .andWhere(db.raw("extract(day from reservationDate) = ?", [day]));
  const allWorkingHours = allWorkingHoursInDay(date);
  const allTakenHours = reservations.then((reservations: any) =>
    allTakenHoursInDay(reservations)
  );
  try {
    const {finish} = getStartAndFinishHour(parseInt(moment(date).format("E")));
    const finishHour = moment(date).hour(finish);
    console.log(finishHour)
    const result = await Promise.all([allWorkingHours, allTakenHours]);
    const freeHours = result[0]
      .filter(
        hour => {
            const withDuration = hour.clone().add(duration, 'm')
            return !result[1].map((taken: any) => taken.isSame(hour) || taken.isSame(withDuration)).includes(true) && withDuration.isBefore(finishHour)
        }
      )
      .map(hour => hour.format("kk:mm"));
    return freeHours;
  } catch (error) {
    console.log(error);
  }
};

export const makeReservation = async ({
  token,
  reservationData
}: {
  token: string;
  reservationData: ReservationData;
}) => {
  if (token.length > 0) {
    const userData = jwt.verify(token, "supersecretkey")
    try {
        const reservation = {
            reservationdate: reservationData.date,
            idc: userData.userId,
            idb: reservationData.IdB,
            ids: reservationData.IdS,
            comment: reservationData.comment,
            status: "pending"
        }
        const createdReservation = await db("reservation").insert(reservation).returning("*")
        return true
    } catch(error) {
        console.log(error)
    }
  }
};
