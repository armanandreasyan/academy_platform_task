import {Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpException} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    if(this.usersService.userValidationCreate(createUserDto)){
      throw new HttpException("All fields must be filled, incorrect types", 400)
    }
    if (this.usersService.companyValidation(createUserDto.company)){
      throw new HttpException("Type of company name, catchPhrase and bs must be string", 400)
    }
    if (this.usersService.addressValidation(createUserDto.address)){
      throw new HttpException(" type of Address city, street, suite, zipcode, geo.lat, geo.lng must be string", 400)
    }

    return this.usersService.createUser(createUserDto);
  }

  @Get(":id/posts")
  getPostsByUserId(@Param("id") id: string, @Res() res){
    if (isNaN(+id)){
      throw new HttpException("Type of params id must be a number.", 400)
    }
    return res.redirect(`/posts/user/${id}`);
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    if (isNaN(+id)){
      throw new HttpException("Type of params id must be a number.", 400)
    }
    return this.usersService.getUserByPropId(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (isNaN(+id)){
      throw new HttpException("Type of params id must be a number.", 400)
    }
    if(this.usersService.userValidationUpdate(updateUserDto)){
      throw new HttpException("name, address, phone, website, company must be filled in with the correct types", 400)
    }
    if (this.usersService.companyValidation(updateUserDto.company)){
      throw new HttpException("Type of company name, catchPhrase and bs must be string", 400)
    }
    if (this.usersService.addressValidation(updateUserDto.address)){
      throw new HttpException("Type of address city, street, suite, zipcode, geo.lat, geo.lng must be string", 400)
      }

    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (isNaN(+id)){
      throw new HttpException("Type of params id must be a number.", 400)
    }
    return this.usersService.removeUser(+id);
  }


}
