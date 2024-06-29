import { Statue } from './Statue';
import { Theme } from './Theme';

export class User {
  constructor(
    public id: number = 0,
    public email: string = '',
    public password: string = '',
    public name: string = '',
    public image: string | null = null,
    public theme: Theme | null = null,
    public statues: Statue[] = [],
    public friends: User[] = [],
    public friendOf: User[] = [],
    // public sentFriendRequests: FriendRequest[] = [],
    // public receivedFriendRequests: FriendRequest[] = []
  ) {}
}
