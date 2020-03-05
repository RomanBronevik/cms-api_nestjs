import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards, Req, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Article } from '../../entities/article.entity';
import { ArticleService } from './article.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permission.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { extname } from 'path'

@Controller('api/article')
@UseGuards(PermissionsGuard)
export class ArticleController {

  constructor(private service: ArticleService,
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @Permissions('getArticles')
  getArticles(@Req() request: Request) {
    const page = parseInt(request.query.page) || 0;
    const size = parseInt(request.query.size) || 10;
    const keyword = request.query.keyword;
    const categoryId = request.query.categoryId;
    const sort = request.query.sort;
    const order = request.query.order;
    const idOfClient = request.query.idOfClient;
    return this.service.getArticles(page, size, keyword, categoryId, sort, order, idOfClient);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('export')
  @Permissions('exportFile')
  exportArticle(@Res() res: Response) {
    return this.service.exportArticle(res);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @Permissions('getArticle')
  getArticle(@Param() params) {
    try {
      return this.service.getArticle(params.id);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @Permissions('createArticle')
  createArticle(@Body() article: Article) {
    try {
      return this.service.createArticle(article);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  @Permissions('updateArticle')
  updateArticle(@Body() article: Article) {
    try {
      return this.service.updateArticle(article);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @Permissions('deleteArticle')
  deleteArticle(@Param() params: Article) {
    try {
      return this.service.deleteArticle(params);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('import')
  @Permissions('importFile')
  @UseInterceptors(FileInterceptor('fileToImport', {
    storage: diskStorage({
      destination: './uploads'
      , filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      }
    })
  }))
  async importArticle(@UploadedFile() file) {
    return this.service.importArticle(file);
  }

}