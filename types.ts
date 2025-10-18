export enum Page {
  Login,
  Pricing,
  Editor,
  Register,
  Settings,
  Tasks,
  Merge,
}

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  status: 'available' | 'claimable' | 'claimed';
}