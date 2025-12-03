import { Controller, Get, Query, Param } from '@nestjs/common';
import { ExplorerService } from './explorer.service';

@Controller('api/explorer')
export class ExplorerController {
  constructor(private readonly explorerService: ExplorerService) {}

  @Get('pokemon')
  async findAll(@Query('limit') limit: number, @Query('offset') offset: number) {
    return this.explorerService.getPokemons(limit, offset);
  }

  @Get('pokemon/:name')
  async findOne(@Param('name') name: string) {
    return this.explorerService.getPokemonDetails(name);
  }
}