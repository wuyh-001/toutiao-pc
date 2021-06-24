import request from '@/utils/request';

export const login = data => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data
    })
}

// 获取用户信息
export const getUserProfile = () => {
    return request({
      method: 'GET',
      url: '/app/v1_0/user/profile',
    })
  }




