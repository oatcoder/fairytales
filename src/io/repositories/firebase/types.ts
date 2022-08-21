export interface IFirebaseConfig {

}

export interface IFirebaseRepository {
  get<T> (url: string): Promise<T>
  put<T> (url: string, data: any): Promise<T>
  handleError<T> (reason: any): Promise<T>
}
