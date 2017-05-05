/**
 * Created by simon on 2016/12/5.
 */
require('babel-core/register');
function ignore() {
  var extensions = ['.css', '.scss','.less','png','jpg','gif','svg']; //服务端渲染不加载的文件类型
  for (let i = 0, len = extensions.length; i < len; i++) {
    require.extensions[extensions[i]] = function () {
      return false;
    };
  }
}
module.exports = ignore;
