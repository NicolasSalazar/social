import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { parse } from 'dotenv';

@Injectable()
export class ReadEnvService {

	private readonly envConfig: { [key: string]: string };

	constructor() {

		const isDevelopment = process.env.NODE_ENV?.toString().toLowerCase() !== 'production';

		if (isDevelopment) {

			const envFilePath = __dirname + '/../../../.env';
      		const existsPath = fs.existsSync(envFilePath);

			if (!existsPath) {
				process.exit();
			}

			this.envConfig = parse(fs.readFileSync(envFilePath));
		} else {
			this.envConfig = process.env;
		}
	}

	getEnv(key: string): string {
		return this.envConfig[key];
	}
}