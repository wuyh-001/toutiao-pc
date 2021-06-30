/**
 * 文章相关请求模块
 */
 import request from '@/utils/request'

 /**
  * 获取文章列表
  */
 export const getComments = params => {
   return request({
     method: 'POST',
     url: ' /mp/v1_0/comments',
     params: {
        response_type: "comment",
        // page: xxx // 页码
      },
   })
 }