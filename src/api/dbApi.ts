import { firestore } from 'firebase'
import { db } from '../configs/firebase.config'

export const schedsColl = db.collection('schedules')

export const dbApi = {
  async addDoc(
    data: firestore.DocumentData
  ): Promise<firestore.DocumentReference<firestore.DocumentData>> {
    const response = await schedsColl.add(data)
    return response
  },

  async getDoc(
    id: string
  ): Promise<firestore.DocumentSnapshot<firestore.DocumentData>> {
    const docRef = schedsColl.doc(id)

    const response = await docRef.get()
    return response
  },

  async getDocs(
    email: string,
    userID: string
  ): Promise<firestore.QuerySnapshot<firestore.DocumentData>> {
    const mySchedules = schedsColl
      .where('email', '==', email)
      .where('userid', '==', userID)

    const response = mySchedules.get()
    return response
  },

  async delDoc(
    id: string
  ): Promise<void> {
    const docRef = schedsColl.doc(id)

    const response = await docRef.delete()
    return response
  },

  async updateDoc(
    id: string,
    data: firestore.UpdateData
  ): Promise<void> {
    const docRef = schedsColl.doc(id)

    const response = await docRef.update(data)
    return response
  },

  async getTimeTable(
    id: string
  ): Promise<firestore.DocumentSnapshot<firestore.DocumentData>> {
    const docRef = schedsColl.doc(id)

    const response = await docRef.get()
    //@ts-ignore
    return response.data().timetable
  },

}
