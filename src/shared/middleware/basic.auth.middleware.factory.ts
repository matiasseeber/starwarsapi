import { NextFunction, Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';

export function BasicAuthMiddlewareFactory(
  configService: ConfigService,
  configName: string = 'swagger',
) {
  const knownConfigurations: Record<
    string,
    { username: string; passwordHash: string }
  > = {
    docs: {
      username: configService.get<string>('SWAGGER_USERNAME') || '',
      passwordHash: configService.get<string>('SWAGGER_PASSWORD_HASH') || '',
    },
  };

  const configToUse = knownConfigurations[configName];
  const { username, passwordHash } = configToUse;

  return async function (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const authHeader = req.get('authorization');

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      sendUnauthorizedResponse(res);
      return;
    }

    const encodedCreds = authHeader.split(' ')[1];
    console.log(encodedCreds);
    const decodedCreds = Buffer.from(encodedCreds, 'base64').toString('utf-8');
    const [inputUsername, inputPassword] = decodedCreds.split(':');

    if (!username || !passwordHash || inputUsername !== username) {
      sendUnauthorizedResponse(res);
      return;
    }

    const isPasswordValid = await bcrypt.compare(inputPassword, passwordHash);

    if (!isPasswordValid) {
      sendUnauthorizedResponse(res);
      return;
    }

    next();
  };

  function sendUnauthorizedResponse(res: Response): void {
    res.setHeader(
      'WWW-Authenticate',
      'Basic realm="Restricted Area", charset="UTF-8"',
    );
    res.sendStatus(401);
  }
}
