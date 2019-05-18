"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * arrayの重複を排除する
 * @param {*} arr1 array of object
 * @param {*} arr2 array of object
 * arr1に重複を排除して追加する
 */
function deduplicate(arr1, arr2) {
    arr2.forEach(item2 => {
        let flag = true;
        arr1.forEach(item1 => {
            if (item1.url === item2.url) {
                flag = false;
                return;
            }
        });
        if (flag)
            arr1.push(item2);
    });
    return arr1;
}
exports.deduplicate = deduplicate;
/**
 * tree構造を一次元のリストにする
 */
function treeToFlatList(tree) {
    function loop(node, result) {
        if (node.url) { // ディレクトリはurlを持たないのでこれで判断する
            result.push(node);
        }
        else if (node.children) {
            for (let i = 0; i < node.children.length; i++) {
                const item = node.children[i];
                loop(item, result);
            }
        }
        return result;
    }
    return loop(tree, []);
}
exports.treeToFlatList = treeToFlatList;
