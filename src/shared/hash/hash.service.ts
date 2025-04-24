import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {

  // Numero de rondas (complejidad) que usara bcrypt para generar el hash, a mas rondas, mas seguro pero mas lento
  private readonly saltRounds = 10;

  // Recibe una contraseña en texto plano y devuelve un hash seguro
  async hashPassword(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.saltRounds);
  }

  // Compara una contraseña en texto plano con un hash para verificar si coinciden
  async comparePassword(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
