export interface GenericResponse {
  message: string;
  success: boolean
}

export interface LoginResponse extends GenericResponse {
  data: {
    user: {
      id: string;
      email: string;
    },
    token: string;
  }
}

export interface Profile {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  picture?: string;
  bio?: string;
  lastLoginDate: string;
  isActive: boolean;
}

export interface GetProfileProps extends GenericResponse {
  data: Profile;
}

export interface GetFollowersProps extends GenericResponse {
  data: Array<{
    email: string;
    username: string;
    picture: string | null;
  }>
}