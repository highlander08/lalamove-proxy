/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Headers, Post, Res } from '@nestjs/common';
// import { LalamoveService } from './lalamove.service';
import express from 'express';
import axios from 'axios';

@Controller('lalamove')
export class LalamoveController {
  // constructor(private readonly lalamoveService: LalamoveService) { }

  @Post('proxy')
  async proxyToLalamove(
    @Body() body: any,
    @Headers() headers: any,
    @Res() res: express.Response
  ) {
    try {
      // Extract path from body or use default
      const path = body.path || '/v3/quotations';

      // Forward the request to Lalamove
      const response = await axios({
        method: 'POST',
        url: `https://sandbox-rest.lalamove.com${path}`,
        data: body.data || body,
        headers: {
          'Authorization': headers.authorization,
          'Market': headers.market,
          'Content-Type': 'application/json',
          'Host': 'sandbox-rest.lalamove.com'
        },
        timeout: 30000
      });

      // Return Lalamove response
      return res.status(response.status).json(response.data);

    } catch (error) {
      console.error('Proxy Error:', error.response?.data || error.message);

      return res.status(error.response?.status || 500).json({
        error: 'Proxy error',
        message: error.response?.data || error.message
      });
    }
  }

  @Post('v3/quotations')
  async createQuotation(@Body() body: any, @Headers() headers: any, @Res() res: express.Response) {
    return this.proxyToLalamove({ ...body, path: '/v3/quotations' }, headers, res);
  }

  @Post('v3/orders')
  async createOrder(@Body() body: any, @Headers() headers: any, @Res() res: express.Response) {
    return this.proxyToLalamove({ ...body, path: '/v3/orders' }, headers, res);
  }

  @Post('v3/*')
  async catchAll(@Body() body: any, @Headers() headers: any, @Res() res: express.Response) {
    return this.proxyToLalamove(body, headers, res);
  }
}
