import { HttpStatus, Injectable } from '@nestjs/common';
import Axios from 'axios';
import { parseString } from 'xml2js';
import { MediumPostType } from 'posts/types/medium-post.type';
import { PostResponse } from 'posts/responses/post.response';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
@Injectable()
export class PostsService {
  public async getPosts(): Promise<Array<PostResponse>> {
    let arrayPosts = [];
    try {
      const response = await Axios.get('https://medium.com/feed/@infomatix');
      await parseString(response.data, (err, data) => {
        arrayPosts = data.rss.channel[0].item.map((post) => post);
      });
    } catch (error) {
      throw new HttpException(
        'Error parsing posts from infomatix.medium.com',
        HttpStatus.REQUEST_TIMEOUT,
      );
    }
    return Promise.all(
      arrayPosts.map(async (post: MediumPostType) => {
        let img = '';
        try {
          await parseString(post['content:encoded'][0], (err, data) => {
            img = data.figure?.img[0]['$']['src'];
          });
        } catch (e) {}
        return new PostResponse({
          title: post.title[0],
          date: post.pubDate[0],
          content: post['content:encoded'][0],
          link: post.link[0],
          img,
        });
      }),
    );
  }
}
