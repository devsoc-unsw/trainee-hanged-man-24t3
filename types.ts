import {ObjectId} from "mongodb";

export type User = {
  _id: ObjectId;
  password: string;
  username: string;
  coins: number;
  exp: number;
  userLevel: number;
  inventory: Item<ItemType>[];
  dailyTasks: DailyTask[];
  mainQuest: MainQuest[];
  tower: Tower;
};

export type DailyTask = {
  id: number;
  description: string;
  reward: number;
  deadline: Date;
  completed: boolean;
  // possibly add more fields
};

export type MainQuest = {
  id: number;
  description: string;
  reward: number;
  deadline: Date;
  completed: boolean;
  // possibly add more fields
};

export type Tower = {
  numLevels: number;
  levels: Level[];
};

export type Level = {
  levelNumber: number;
  wallpaper: Item<'wallpaper'> | null;
  flooring: Item<'flooring'> | null;
  furniture: Item<'furniture'>[];
};

export type Item<T extends ItemType> = {
  id: number;
  type: T;
  name: string; // Displayed in inventory/ store
  image: string;
  price: number;
  towerLevel: null | number; // null if not placed in the tower (coordinates can be relevant to tower level?)
  xCoord: null | number; // null if not placed in the tower
  yCoord: null | number; // null if not placed in the tower
}

export type ItemType = 'wallpaper' | 'flooring' | 'furniture';