import { User } from './User';

export class Statue {
  constructor(
    public id: number = 0,
    public title: string = '',
    public description: string = '',
    public author_date: string = '',
    public material: string = '',
    public latitude: number = 0,
    public longitude: number = 0,
    public image_url: string = '',
    public users: User[] = [],
  ) {}
}
