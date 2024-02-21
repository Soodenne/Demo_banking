import { DecodedIdToken } from "firebase-admin/lib/auth";
import { HttpException } from "@nestjs/common";

export interface Auth {
  verifyToken(token: string): Promise<DecodedIdToken>;
}

export interface AuthRepository {
  verifyToken(token: string): Promise<DecodedIdToken>;
}

export interface AuthUseCase {
  verifyToken(token: string): Promise<DecodedIdToken>;
}
export const ErrMessUnauthorized = new HttpException('Unauthorized', 401);