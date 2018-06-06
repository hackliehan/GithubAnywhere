/**
 * @desc 数组功能扩展,扩展 lodash 中未实现方法
 * @author binhg
 */

export default class ArrayUtils {

    /**
     * 根据子项对比 Array
     */
    static isEqual(arr1,arr2){
        for (let index = 0; index < arr1.length; index++) {
            let item1 = arr1[index],
                item2 = arr2[index];
            if(item1 !== item2)
            return false;
        }
        return true;
    }

    /**
     * 非深层克隆一个数组
     */
    static clone(array){
        let newArray = [];
        for (let index = 0; index < array.length; index++) {
            let item = array[index];
            newArray.push(item);
        }
        return newArray;
    }


    /**
     * 遍历变化子项,有则覆盖,无则添加
     */
    static updateArray(array,item){
        for (let index = 0; index < array.length; index++) {
            let element = array[index];
            if(element === item) array.splice(index,1);
        }
        return array.push(item);
    }


}