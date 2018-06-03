/**
 * @desc 数组功能扩展,扩展 lodash 中未实现方法
 * @author binhg
 */

export default class ArrayUtils {
    /**
     * 遍历变化子项,有则覆盖,无则添加
     */
    static updateArray(array,item){
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if(element === item) array.slice(index,1);
        }
        return array.push(item);
    }


}