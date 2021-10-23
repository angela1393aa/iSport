import React from 'react';
import ArticleCardRight from './ArticleCardRight';
function ArticleList(props) {
    const { ArticleCard } = props;
    return (
        <div className="col-md-8 cart">
            {ArticleCard.map((article, index) => (
                <ArticleCardRight
                    key={index}
                    category={article.category}
                    smTitle={article.smTitle}
                    bigTitle={article.bigTitle}
                    photo={article.photo}
                />
            ))}
        </div>
    );
}

export default ArticleList;
