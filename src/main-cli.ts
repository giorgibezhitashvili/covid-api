import { CommandFactory } from 'nest-commander';
import { CommandModule } from './modules/command/command.module';

async function bootstrap() {
  await CommandFactory.run(CommandModule);
}
bootstrap();