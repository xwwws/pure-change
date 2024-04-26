import request from '@/utils/http/request';

/**
 * 登录
 * @param data
 */
export const login = (data: User.loginParams):Promise<Response<User.loginRes>> => {
  return request({
    method: 'post',
    data,
    url: '/api/v1/auth/login'
  });
};
