import React from 'react';
import ArticleHeader from '../images/—Pngtree—404 error interface theme design_4043818.png';
function NotFoundPage() {
    return (
        <>
            <img className="w-1/3 m-auto" src={ArticleHeader} alt="" />
            <h1 className="text-5xl  text-white text-center">
                很抱歉!找不到此頁面!
            </h1>
            <h1 className="text-3xl  text-white text-center">
                您可能連結了一個錯誤或不存在的網址，您可以回上一頁或回首頁
            </h1>
            <h5 className="text-xl  text-center">
                <a
                    href="https://zh.pngtree.com/freepng/404-error-interface-theme-design_4043818.html"
                    target="_blank"
                    rel="noreferrer"
                >
                    圖片來自:pngtree.com
                </a>
            </h5>
        </>
    );
}

export default NotFoundPage;
