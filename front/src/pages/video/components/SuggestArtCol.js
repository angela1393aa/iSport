import useGet from '../../../utils/useGet';
import { Link } from 'react-router-dom';
import Person1 from './../../../images/person-1.jpg';
import { FaEye } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaClock } from 'react-icons/fa';
import moment from 'moment';
const SuggestVideoCol = () => {
    const {
        data: suggestArticles,
        error,
        isPending,
    } = useGet(`/videos/suggestArticles`);

    return (
        <>
            {suggestArticles &&
                suggestArticles.map((article, idx) => (
                    <Link
                        to={'/article/' + article.id}
                        className="flex mt-6 h-20"
                    >
                        <div className="mr-4">
                            <h2 className="text-4xl text-extrabold text-white">
                                {idx + 1}
                            </h2>
                        </div>
                        <div className="flex flex-col justify-between">
                            <h4 className="text-white text-lg">
                                {article.title}
                            </h4>
                            <div className="flex items-center">
                                <BsFillPersonFill className="text-yellow-400 mr-1 cursor-pointer" />
                                <h4 className="text-sm text-white mr-4">
                                    {article.user_name}
                                </h4>
                                <FaClock className="text-yellow-400 mr-1" />
                                <h4 className="text-xs text-white mr-4">
                                    {moment(article.upload_date).format(
                                        'YYYY-MM-DD HH:mm'
                                    )}
                                </h4>
                                <FaEye className="text-yellow-400 mr-1" />
                                <h4 className="text-sm text-white mr-4">
                                    {article.views}
                                </h4>
                            </div>
                        </div>
                    </Link>
                ))}
        </>
    );
};

export default SuggestVideoCol;
