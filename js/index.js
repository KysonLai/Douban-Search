
const input = document.getElementById('search-input');
const selectObj = document.getElementById('search-select');

const count = document.getElementById('result-count');
const text_books = document.getElementById('result-tbody');


// 获取图书搜索结果
function getBookInfo() {

    // 判空
    const reg = /^\s*$/
    if (reg.test(input.value)) {
        alert('输入为空')
    }else {
        // 判断名字搜索或标签搜索
        const value = selectObj.options[selectObj.selectedIndex].value;
        let searchBy = '';
        if (value === '0') {
            // 通过书名搜索
            searchBy = 'q'
        }else {
            // 通过标签搜索
            searchBy = 'tag'
        }
        // 发送请求并处理返回的数据
        $.ajax({
            type: 'get',
            url: 'https://api.douban.com/v2/book/search?'+searchBy+'='+input.value+'&count=100',
            async:true,
            dataType: 'jsonp',
            timeout:5000,
            success: function (data) {
                console.log('请求成功');
                count.innerHTML = '共搜索到<span>'+data.total+'</span>条相关信息，只显示前100个结果';
                text_books.innerHTML = '';
                let frg = document.createDocumentFragment();
                for(let i=0;i<data.books.length;i++){
                    let text_tr = document.createElement("tr");
                    // 对返回的数据进行处理
                    let publisher = '';
                    data.books[i].publisher  === ''?publisher = '暂无信息':publisher = data.books[i].publisher;
                    let pubdate = '';
                    data.books[i].pubdate  === ''?pubdate = '暂无信息':pubdate = data.books[i].pubdate;
                    let price = '';
                    data.books[i].price  === ''?price = '暂无信息':price = data.books[i].price;
                    let author = '';
                    if (data.books[i].author.length !== 0) {
                        let counts = 0;
                        for (let j=0;j<data.books[i].author.length;j++) {
                            counts++;
                            if (counts > 1) {
                                author += ' / ';
                            }
                            author += data.books[i].author[j];
                        }
                    }else {
                        author = '暂无信息';
                    }

                    text_tr.innerHTML = '<td><a href="'+data.books[i].alt+'" target="_blank">'+ data.books[i].title +'</td><td>'+ author +'</td><td>'+ publisher +'</td><td>'+ pubdate +'</td><td>'+ data.books[i].rating.average +'</td><td>'+ price +'</td>';
                    frg.appendChild(text_tr);
                }
                text_books.appendChild(frg);
                frg = null;            // 释放内存
            },
            error:function(){
                alert('请求失败！');
            }
        });
    }
}

// 获取电影搜索结果
function getMovieInfo() {

    // 判空
    const reg = /^\s*$/;
    if (reg.test(input.value)) {
        alert('输入为空')
    }else {
        // 判断名字搜索或类型搜索
        const value = selectObj.options[selectObj.selectedIndex].value;
        let searchBy = '';
        if (value === '0') {
            // 通过名字搜索
            searchBy = 'q'
        }else {
            // 通过类型搜索
            searchBy = 'tag'
        }
        // 发送请求并处理返回的数据
        $.ajax({
            type: 'get',
            url: 'http://api.douban.com/v2/movie/search?'+searchBy+'='+input.value+'&count=100',
            async:true,
            dataType: 'jsonp',
            timeout:5000,
            success: function (data) {
                console.log('请求成功');
                count.innerHTML = '共搜索到<span>'+data.total+'</span>条相关信息，只显示前20个结果';
                text_books.innerHTML = '';
                let frg = document.createDocumentFragment();
                for(let i=0;i<data.subjects.length;i++){
                    let text_tr = document.createElement("tr");
                    // 对返回的数据进行处理
                    let directors = '';
                    if (data.subjects[i].directors.length !== 0) {
                        let counts = 0;
                        for (let j=0;j<data.subjects[i].directors.length;j++) {
                            counts++;
                            if (counts > 1) {
                                directors += ' / ';
                            }
                            directors += data.subjects[i].directors[j].name;
                        }
                    }else {
                        directors = '暂无信息';
                    }
                    let genres = '';
                    if (data.subjects[i].genres.length !== 0) {
                        let counts = 0;
                        for (let j=0;j<data.subjects[i].genres.length;j++) {
                            counts++;
                            if (counts > 1) {
                                genres += ' / ';
                            }
                            genres += data.subjects[i].genres[j];
                        }
                    }else {
                        genres = '暂无信息';
                    }

                    text_tr.innerHTML = '<td><a href="'+data.subjects[i].alt+'" target="_blank">'+ data.subjects[i].title +'</td><td>'+ genres +'</td><td>'+ directors +'</td><td>'+ data.subjects[i].year +'</td><td>'+ data.subjects[i].rating.average +'</td>';
                    frg.appendChild(text_tr);
                }
                text_books.appendChild(frg);
                frg = null;            // 释放内存
            },
            error:function(){
                alert('请求失败！');
            }
        });
    }
}

// 向下滚动隐藏导航
const header = document.getElementsByTagName('header')[0];
window.onscroll = function(){
    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    scrollTop > 60 ? header.style.display = 'none' : header.style.display = 'block';
};