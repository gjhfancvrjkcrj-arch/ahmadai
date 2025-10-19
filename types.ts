export enum Page {
  Login,
  Pricing,
  Editor,
  Register,
  Settings,
  Tasks,
  Merge,
  Generator,
}

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  status: 'available' | 'claimable' | 'claimed';
}

export interface GeneratedAccount {
    email: string;
    pass: string;
    subscriptionType: string;
    expiresAt: number | null;
}