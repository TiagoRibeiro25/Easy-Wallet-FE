export interface IUser {
  id: number;
  email: string;
  displayName: string;
  userVerified: boolean;
  currency: string;
  createdAt: string;
}

export interface ICategory {
  id: number;
  name: string;
  iconId: number;
  createdAt: string;
  updatedAt: string;
}

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface INotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
}

export interface INewNotification extends Omit<INotification, 'id'> {}
