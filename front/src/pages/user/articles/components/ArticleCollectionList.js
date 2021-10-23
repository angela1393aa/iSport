import { Link } from 'react-router-dom';
import { FaEye, FaClock } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import moment from 'moment';

const ArticleCollectionList = ({ collectedArticles }) => {
    return (
        <>
            {collectedArticles &&
                collectedArticles.map(article => {
                    return (
                        <Link
                            to={'/article/' + article.id}
                            className="flex mt-6 h-20 w-full mb-2.5"
                        >
                            <div className="flex flex-col justify-between w-full">
                                <h4 className="text-white text-lg">
                                    {article.title}
                                </h4>
                                <div className="flex items-center justify-between">
                                    <div className="flex">
                                        <BsFillPersonFill className="text-yellow-400 mr-1 cursor-pointer" />
                                        <h4 className="text-sm text-white">
                                            {article.user_name}
                                        </h4>
                                    </div>
                                    <div className="flex">
                                        <FaClock className="text-yellow-400 mr-1" />
                                        <h4 className="text-xs text-white">
                                            {moment(article.upload_date).format(
                                                'YYYY-MM-DD HH:mm'
                                            )}
                                        </h4>
                                    </div>
                                    <div className="flex">
                                        <FaEye className="text-yellow-400 mr-1" />
                                        <h4 className="text-sm text-white">
                                            {article.views}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
        </>
    );
};

export default ArticleCollectionList;
