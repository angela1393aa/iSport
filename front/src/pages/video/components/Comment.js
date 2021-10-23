import { useState } from 'react';
import moment from 'moment';
import { BiDotsHorizontal } from 'react-icons/bi';
import { useAuth } from '../../../context/auth';
import useToggle from '../../../utils/useToggle';
import Person2 from './../../../images/person-2.jpg';

moment.locale('zh-tw', {
    months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
    weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
    longDateFormat: {
        LT: 'Ah點mm分',
        LTS: 'Ah點m分s秒',
        L: 'YYYY-MM-DD',
        LL: 'YYYY年MMMD日',
        LLL: 'YYYY年MMMD日Ah點mm分',
        LLLL: 'YYYY年MMMD日ddddAh點mm分',
        l: 'YYYY-MM-DD',
        ll: 'YYYY年MMMD日',
        lll: 'YYYY年MMMD日Ah點mm分',
        llll: 'YYYY年MMMD日ddddAh點mm分'
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour: function (h, meridiem) {
        let hour = h;
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === '凌晨' || meridiem === '早上' ||
            meridiem === '上午') {
            return hour;
        } else if (meridiem === '下午' || meridiem === '晚上') {
            return hour + 12;
        } else {
            // '中午'
            return hour >= 11 ? hour : hour + 12;
        }
    },
    meridiem: function (hour, minute, isLower) {
        const hm = hour * 100 + minute;
        if (hm < 600) {
            return '凌晨';
        } else if (hm < 900) {
            return '早上';
        } else if (hm < 1130) {
            return '上午';
        } else if (hm < 1230) {
            return '中午';
        } else if (hm < 1800) {
            return '下午';
        } else {
            return '晚上';
        }
    },
    calendar: {
        sameDay: function () {
            return this.minutes() === 0 ? '[今天]Ah[點整]' : '[今天]LT';
        },
        nextDay: function () {
            return this.minutes() === 0 ? '[明天]Ah[點整]' : '[明天]LT';
        },
        lastDay: function () {
            return this.minutes() === 0 ? '[昨天]Ah[點整]' : '[昨天]LT';
        },
        nextWeek: function () {
            let startOfWeek, prefix;
            startOfWeek = moment().startOf('week');
            prefix = this.diff(startOfWeek, 'days') >= 7 ? '[下]' : '[本]';
            return this.minutes() === 0 ? prefix + 'dddA點整' : prefix + 'dddAh點mm';
        },
        lastWeek: function () {
            let startOfWeek, prefix;
            startOfWeek = moment().startOf('week');
            prefix = this.unix() < startOfWeek.unix() ? '[上]' : '[本]';
            return this.minutes() === 0 ? prefix + 'dddAh點整' : prefix + 'dddAh點mm';
        },
        sameElse: 'LL'
    },
    ordinalParse: /\d{1,2}(日|月|周)/,
    ordinal: function (number, period) {
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return number + '日';
            case 'M':
                return number + '月';
            case 'w':
            case 'W':
                return number + '周';
            default:
                return number;
        }
    },
    relativeTime: {
        future: '%s内',
        past: '%s前',
        s: '幾秒',
        m: '1 分鐘',
        mm: '%d 分鐘',
        h: '1 小時',
        hh: '%d 小時',
        d: '1 天',
        dd: '%d 天',
        M: '1 個月',
        MM: '%d 个月',
        y: '1 年',
        yy: '%d 年'
    },
    week: {
        // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
});

const Comment = ({ comments, onDelete, onEdit, currentEdit, onSubmit, editValue, setEditValue }) => {
    const { member, setMember } = useAuth();
    const [openEdit, setOpenEdit] = useToggle(false);
    const [editInput, setEditInput] = useState(null);

    const handleEdit = (e) => {
        if (parseInt(e.target.dataset.index) === currentEdit) {
            setOpenEdit();
        } else {
            onEdit(parseInt(e.target.dataset.index));
            setOpenEdit(true);
        }
    };

    const handleEditComment = () => {
        setOpenEdit(false);
        setEditInput(currentEdit);
        setEditValue(comments[currentEdit].content);
    };

    const handleCancelEdit = () => {
        setEditInput(null);
        setEditValue('');
    };

    const handleDelete = () => {
        setOpenEdit(false);
        onDelete(currentEdit);
    };

    return (
        <>
            {
                (comments !== null) && comments.map((comment, idx) => {
                    let time = moment(comment.date).fromNow();
                    return (<div className="flex mb-6">
                        <img
                            className="w-12 h-12 rounded-full mr-4"
                            src={Person2}
                        />
                        <div className="flex flex-col w-full mr-6 max-h-28">
                            <div className="flex">
                                <div className="flex">
                                    <h4 className="text-white font-bold text-sm mb-3 mr-2">{comment.username}</h4>
                                    <span className="text-gray-400 text-sm">{time}</span>
                                </div>

                                <div className="flex ml-auto relative">
                                    {openEdit && (currentEdit === idx) &&
                                        <>
                                            <div className="bg-gray-700 w-28 h-16 rounded-md shadow-lg absolute right-2 top-4 py-1 z-5">
                                                <ul className="flex flex-col justify-evenly items-center h-full">
                                                    <li className="text-white flex w-full h-full items-center justify-center hover:bg-gray-900 cursor-pointer relative">
                                                        <div
                                                            className="absolute w-full h-full"
                                                            onClick={() => handleEditComment()}
                                                        >
                                                        </div>
                                                        <p>修改留言</p>
                                                    </li>
                                                    <li
                                                        className="text-white flex w-full h-full items-center justify-center hover:bg-gray-900 cursor-pointer"
                                                        onClick={() => handleDelete()}
                                                    ><p>刪除留言</p></li>
                                                </ul>
                                            </div>
                                            <div
                                                className="w-full h-full z-0 flex fixed top-0 right-0"
                                                onClick={() => setOpenEdit(false)}
                                            >
                                            </div>
                                        </>}
                                    {member && (member.id === comment.user_id) &&
                                        <div className="flex h-4 relative">
                                            <div
                                                className="flex w-full h-full cursor-pointer absolute"
                                                data-index={idx}
                                                onClick={e => handleEdit(e)}
                                            >
                                            </div>
                                            <BiDotsHorizontal className="text-white text-lg" />
                                        </div>}
                                </div>
                            </div>
                            {(editInput === idx) ?
                                <>
                                    <textarea
                                        className="commentInput pb-1.5 placeholder-white text-base text-white border-b border-gray-400 bg-gray-800
                                        w-full focus:outline-none focus:placeholder-gray-400 focus:border-white mb-2 h-12"
                                        placeholder="新增留言"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                    ></textarea>
                                    <div className="flex justify-end">
                                        <button
                                            className="btn-gray-sm mr-2"
                                            type="button"
                                            onClick={() => handleCancelEdit()}
                                        >取消</button>
                                        <button
                                            className="btn-yellow-sm"
                                            type="submit"
                                            onClick={() => {
                                                onSubmit();
                                                setEditInput(null);
                                            }}
                                        >修改</button>
                                    </div>
                                </>
                                : <p className="text-white text-sm">
                                    {comment.content}
                                </p>}
                        </div>
                    </div>);
                })}
        </>);
};

export default Comment;
