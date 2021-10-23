const ArticleCardRight = (props) => {
    const { smTitle, bigTitle, photo } = props;
    return (
        <>
            <div
                className="
                    flex flex-col xl:flex-row my-4
              "
            >
                <div className="p-8">
                    <h3 className="text-2xl lg:text-3xl xl:text-4xl text-white">
                        {smTitle}
                    </h3>
                    <p className="text-base leading-loose tracking-wide text-white">
                        {bigTitle}
                    </p>
                </div>
                <img
                    className="w-60 h-40 rounded-md m-auto"
                    src={`http://localhost:3030/articles/uploads/${photo}`}
                    alt=""
                />
            </div>
        </>
    );
};

export default ArticleCardRight;
