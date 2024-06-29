import { Theme } from './Theme';

export class Profile {
  constructor(
    public name: string = '',
    public email: string = '',
    public theme: Theme = new Theme(), // Asumiendo que tienes una clase Theme definida en alguna parte
    public image: Uint8Array = new Uint8Array(), // Para manejar bytes, similar a byte[] en Java
  ) {}
}
