/**
 * @desc 数组功能扩展,扩展 lodash 中未实现方法
 * @author binhg
 */

export default class ArrayUtils {

    /**
     * 合并更新子项数据到 arr1
     */
    static mixPropById(arr1,arr2,idName,targetKey){
        return arr1.map(item1=>{
            for (let index = 0; index < arr2.length; index++) {
                const item2 = arr2[index];
                if(item1[idName] === item2[idName]){
                    item1[targetKey] = item2[targetKey];
                }
            }
            return item1;
        });
    }

    /**
     *更新数组的子项,根据某项子项属性判定
     */
    static updatePropById(arr,item,idName,targetKey){
        return arr.map(item1=>{
            if(item1[idName] === item[idName]){
                item1[targetKey] = item[targetKey];
            }
            return item1;
        });
    }

    /**
     * 根据属性删除子项
     */
    static delItemById(arr,item,idName){
        return arr.filter(item1=>item1[idName] !== item[idName]);
    }

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