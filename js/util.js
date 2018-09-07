// 给th绑定排序方法
const sort = document.getElementById('th-sort');
let up = true;
sort.onclick = Sort;

// 排序
function Sort(){
    const table = document.getElementsByTagName('table')[0];
    const tbody = table.getElementsByTagName('tbody')[0];
    const tr = table.getElementsByTagName('tr');
    sort_index = sort.cellIndex;
    let array = [];
    for (let i = 1;i < tr.length;i++) {
        array.push(tr[i]);
    }
    if (up) {
        SortUp (array,sort_index );
        up = false;
    } else {
        SortDown (array,sort_index );
        up = true;
    }

    for (let i = 0; i < array.length; i++){
        tbody.appendChild(array[i]);
    }
}
// 升序
function SortUp(array,sort_index){
    for (let i = 0;i < array.length;i++) {
        for (let j = i + 1;j < array.length;j++) {
            if (array[j] === undefined) {
                continue;
            }
            if (array[i].getElementsByTagName('td')[sort_index].innerText <= array[j].getElementsByTagName('td')[sort_index].innerText) {
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
    }
}
// 降序
function SortDown(array,sort_index){
    for (let i = 0;i < array.length;i++) {
        for (let j = i + 1;j < array.length;j++) {
            if (array[j] === undefined) {
                continue;
            }
            if (array[i].getElementsByTagName('td')[sort_index].innerText >= array[j].getElementsByTagName('td')[sort_index].innerText) {
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
    }
}