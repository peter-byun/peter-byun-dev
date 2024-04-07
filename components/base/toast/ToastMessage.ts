import { ReactNode } from 'react';

export class ToastMessage {
  public id: symbol;
  public content: ReactNode;

  public createdAt: number;
  public expiresIn: number;

  public isExpired: boolean;

  static DEFAULT_EXPIRES_IN = 3000;

  constructor(content: ReactNode, expiresIn?: number) {
    this.content = content;
    this.createdAt = new Date().getTime();
    this.id = Symbol(String(this.createdAt));
    this.expiresIn = expiresIn ? expiresIn : ToastMessage.DEFAULT_EXPIRES_IN;
    this.isExpired = false;
  }
}
