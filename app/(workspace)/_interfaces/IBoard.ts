import { Card, List } from '@prisma/client';

export interface IList extends List {
  card?: Card[];
}

export interface ICard extends Card {
  list?: List;
}
