export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export interface Album {
  id: number
  userId: number
  title: string
}

export interface Photo {
  id: number
  albumId: number
  title: string
  url: string
  thumbnailUrl: string
}

export interface Todo {
  id: number
  userId: number
  title: string
  completed: boolean
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}