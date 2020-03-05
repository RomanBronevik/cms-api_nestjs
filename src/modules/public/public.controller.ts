import { Controller, Get, Param, Req, Post, Body } from '@nestjs/common';
import { PublicService } from './public.service';
import { Request } from 'express';

@Controller('api')
export class PublicController {

  constructor(private service: PublicService,
  ) { }

  @Get('/public-articles')
  getArticlesList(@Req() request: Request) {
    try {
      const origin: any = request.headers['origin'];
      const domain = origin.split('://')[1];
      const categoryId = request.query.categoryId;
      return this.service.getArticlesList(domain, categoryId);
    } catch (error) {
      return error.message;
    }
  }

  @Get('/public-articles/:secretKey')
  getArticlesBySecretKey(@Req() request: Request, @Param() params) {
    try {
      const page = parseInt(request.query.page) || 0;
      const size = parseInt(request.query.size) || 10;
      const secretKey = params.secretKey;
      return this.service.getArticlesBySecretKey(page, size, secretKey);
    } catch (error) {
      return error.message;
    }
  }

  @Get('/public-comments')
  getComments(@Req() request: Request) {
    try {
      const categoryId = request.query.categoryId;
      return this.service.getComments(categoryId);
    } catch (error) {
      return error.message;
    }
  }

  @Get('/public-services')
  getServices(@Req() request: Request) {
    try {
      const categoryId = request.query.categoryId;
      return this.service.getServices(categoryId);
    } catch (error) {
      return error.message;
    }
  }

  @Get('/public-categories')
  getCategoriesList(@Req() request: Request) {
    try {
      const origin: any = request.headers['origin'];
      const domain = origin.split('://')[1];
      return this.service.getCategoriesList(domain);
    } catch (error) {
      return error.message;
    }
  }

  @Get('/public-all-categories')
  getAllCategories() {
    try {
      return this.service.getAllCategories();
    } catch (error) {
      return error.message;
    }
  }

  @Get('/public-article/:id')
  getArticleById(@Param() params) {
    try {
      return this.service.getArticleById(params.id);
    } catch (error) {
      return error.message;
    }
  }

  @Get('/public-article-categoryId')
  getArticleByCategoryId(@Req() request: Request) {
    try {
      const categoryId = request.query.categoryId;
      return this.service.getArticleByCategoryId(categoryId);
    } catch (error) {
      return error.message;
    }
  }

  @Get('/generate-api-key')
  generateApiKey() {
    try {
      return this.service.generateApiKey();
    } catch (error) {
      return error.message;
    }
  }

  @Post('/register')
  register(@Body() info) {
    try {
      return this.service.register(info);
    } catch (error) {
      return error.message;
    }
  }

}