import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('iniside ValidateCreateUserPipe!');
    console.log(value);
    console.log(metadata);

    const parseAgeToInt = parseInt(value.age.toString());
    if (isNaN(parseAgeToInt)) {
      console.log(`${value.age} is not a number!`);
      throw new HttpException(
        'Invalid Data type. Expect Number',
        HttpStatus.BAD_REQUEST,
      );
    }
      return { ...value, age: parseAgeToInt };
    }
  }
