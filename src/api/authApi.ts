import { auth, googleProvider } from '../configs/firebase.config'

type ResponseApi = firebase.auth.UserCredential

export const AuthAPI = {
  async signUp(email: string, password: string): Promise<ResponseApi['user']> {
    const response = await auth.createUserWithEmailAndPassword(email, password)
    return response.user
  },

  async signIn(email: string, password: string): Promise<ResponseApi['user']> {
    const response = await auth.signInWithEmailAndPassword(email, password)
    return response.user
  },

  async signOut(): Promise<void> {
    const response = await auth.signOut()
    return response
  },

  async googleSignIn(): Promise<ResponseApi['user']> {
    const response = await auth.signInWithPopup(googleProvider)
    return response.user
  },
}
