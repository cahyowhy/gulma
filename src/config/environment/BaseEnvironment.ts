/**
 * Created by fajar on 03/12/2018.
 *
 * File base environment for development
 * and production and can import by alias
 * 'environment' which has selected
 */

export default {

  ASSETS_URL: '/assets/',
  OFFSET: 0,
  LIMIT: 20,
  MAX_LIMIT: 100,
  LIMIT_ELASTIC: 500,

  LOCALE: 'id',
  DEFAULT_ROUTE_PATH: '/',
  HOME_ROUTE_PATH: '/index',
  RELOAD_LOGIN_LOGOUT: true,
  IDLE_TIMEOUT: 30 // 30 Minutes timeout
};
