import {createSelector} from 'reselect'
import moment from "moment";
import {AdminReport, Attestation, DEV, Drag, Email, Progress, Receipt, Timetable, WIFI} from "../../components";
import Library from "../../components/library/library";
import React from "react";


let pairEnd;
let pairStart;
let pairStartPlus;


let timeTransform = (ev_end, num) => moment().hours(Number(ev_end.slice(11, 13))).minutes(Number(ev_end.slice(14, 16))).add(num, 'minutes');

export const getUserTimeTable = (state) => {
    return state.user.timetable
}

export const getDefaultType = (state) => {
    return state.user.default_account;
}

export const getIsAuth = (state) => {
    return state.user.isAuth
}
export const getCurrentStep = (state) => {
    return state.user.RegStep
}

export const getUserAccounts = (state) => {
    return state.user.accounts
}
export const getWifiAccount = (state) => {
    return state.user.wifi
}

export const getTimeTableCurrWeek = createSelector(getUserTimeTable, (timetable) => {
    if (timetable) {
        if (timetable.current_week.days) {
            const currWeekArr = {
                Monday: [],
                Tuesday: [],
                Wednesday: [],
                Thursday: [],
                Friday: [],
                Saturday: [],
                Sunday: [],
                now_denom: timetable.current_week.now_denom,
                group_name: timetable.group_name || timetable.teacher_name,
            };
            const sortTimeTableCurrWeek = () => {
                for (let j = 0; j < timetable.current_week.days.length; j++) {
                    const item = timetable.current_week.days[j]
                    for (let i = 0; i < item.pairs.length; i++) {
                        if (item.pairs[i].ev_end !== null) {
                            pairEnd = item.pairs[i].ev_end
                        } else if (item.pairs[i].pair_time_end !== null) {
                            pairEnd = item.pairs[i].pair_time_end
                        } else {
                            pairEnd = ''
                        }
                        if (item.pairs[i + 1] && item.pairs[i + 1].ev_start !== null) {
                            pairStartPlus = item.pairs[i + 1].ev_start
                        } else if (item.pairs[i + 1] && item.pairs[i + 1].pair_time_start !== null) {
                            pairStartPlus = item.pairs[i + 1].pair_time_start
                        } else {
                            pairStartPlus = ''
                        }


                        if (item.num_day === 1) {
                            currWeekArr.Monday.push(item.pairs[i]);


                            if (timeTransform(pairEnd, 20).isBefore(timeTransform(pairStartPlus, 0))) {

                                currWeekArr.Monday.push({
                                    pereriv: true,
                                    ev_start_next_pair: pairStartPlus,
                                    ev_end: pairEnd,
                                    pairStart: pairStart
                                });
                            }

                        } else if (item.num_day === 2) {
                            currWeekArr.Tuesday.push(item.pairs[i]);

                            if (timeTransform(pairEnd, 20).isBefore(timeTransform(pairStartPlus, 0), 'minutes')) {
                                currWeekArr.Tuesday.push({
                                    pereriv: true,
                                    ev_start_next_pair: pairStartPlus,
                                    ev_end: pairEnd,
                                    pairStart: pairStart
                                });
                            }

                        } else if (item.num_day === 3) {

                            currWeekArr.Wednesday.push(item.pairs[i]);

                            if (item.pairs[i + 1] && timeTransform(pairEnd, 20).isBefore(timeTransform(pairStartPlus, 0), 'minutes')) {
                                currWeekArr.Wednesday.push({
                                    pereriv: true,
                                    ev_start_next_pair: pairStartPlus,
                                    ev_end: pairEnd,
                                    pairStart: pairStart
                                });
                            }
                        } else if (item.num_day === 4) {
                            currWeekArr.Thursday.push(item.pairs[i]);

                            if (item.pairs[i + 1] && timeTransform(pairEnd, 20).isBefore(timeTransform(pairStartPlus, 0), 'minutes')) {
                                currWeekArr.Thursday.push({
                                    pereriv: true,
                                    ev_start_next_pair: pairStartPlus,
                                    ev_end: pairEnd,
                                    pairStart: pairStart
                                });
                            }
                        } else if (item.num_day === 5) {
                            currWeekArr.Friday.push(item.pairs[i]);
                            if (item.pairs[i + 1] && timeTransform(pairEnd, 20).isBefore(timeTransform(pairStartPlus, 0), 'minutes')) {
                                currWeekArr.Friday.push({
                                    pereriv: true,
                                    ev_start_next_pair: pairStartPlus,
                                    ev_end: pairEnd,
                                    pairStart: pairStart
                                });
                            }

                        } else if (item.num_day === 6) {
                            currWeekArr.Saturday.push(item.pairs[i]);
                            if (item.pairs[i + 1] && timeTransform(pairEnd, 20).isBefore(timeTransform(pairStartPlus, 0), 'minutes')) {
                                currWeekArr.Saturday.push({
                                    pereriv: true,
                                    ev_start_next_pair: pairStartPlus,
                                    ev_end: pairEnd,
                                    pairStart: pairStart
                                });
                            }

                        } else if (item.num_day === 7) {
                            currWeekArr.Sunday.push(item.pairs[i]);
                            if (item.pairs[i + 1] && timeTransform(item.pairs[i].ev_end, 20).isBefore(timeTransform(pairStartPlus, 0), 'minutes')) {
                                currWeekArr.Sunday.push({
                                    pereriv: true,
                                    ev_start_next_pair: pairStartPlus,
                                    ev_end: pairEnd,
                                    pairStart: pairStart
                                });
                            }
                        }
                    }
                }
            }
            sortTimeTableCurrWeek()
            const this_week = [
                {day_name: currWeekArr.Monday, day_name_ru: 'Пн', day_num: 1, item_num: 0},
                {day_name: currWeekArr.Tuesday, day_name_ru: 'Вт', day_num: 2, item_num: 1},
                {day_name: currWeekArr.Wednesday, day_name_ru: 'Ср', day_num: 3, item_num: 2},
                {day_name: currWeekArr.Thursday, day_name_ru: 'Чт', day_num: 4, item_num: 3},
                {day_name: currWeekArr.Friday, day_name_ru: 'Пт', day_num: 5, item_num: 4},
                {day_name: currWeekArr.Saturday, day_name_ru: 'Сб', day_num: 6, item_num: 5},
                {day_name: currWeekArr.Sunday, day_name_ru: 'Вс', day_num: 7, item_num: 6},
            ]
            return [this_week, currWeekArr.group_name, currWeekArr.now_denom]
        } else {

            return [[{day_name: [], day_name_ru: 'Пн', day_num: 1, item_num: 0},
                {day_name: [], day_name_ru: 'Вт', day_num: 2, item_num: 1},
                {day_name: [], day_name_ru: 'Ср', day_num: 3, item_num: 2},
                {day_name: [], day_name_ru: 'Чт', day_num: 4, item_num: 3},
                {day_name: [], day_name_ru: 'Пт', day_num: 5, item_num: 4},
                {day_name: [], day_name_ru: 'Сб', day_num: 6, item_num: 5},
                {day_name: [], day_name_ru: 'Вс', day_num: 7, item_num: 6},],
                typeof (timetable.group_name) === 'string' ? timetable.group_name : 0,
                0
            ]

        }


    }
})

export const getTimeTableNextWeek = createSelector(getUserTimeTable, (timetable) => {


    if (timetable) {
        if (timetable.next_week.days) {
            const nextWeekArr = {
                Monday: [],
                Tuesday: [],
                Wednesday: [],
                Thursday: [],
                Friday: [],
                Saturday: [],
                Sunday: [],
                now_denom: timetable.current_week && timetable.current_week.now_denom,
                group_name: timetable.group_name && timetable.group_name,
            };
            const sortTimeTableNextWeek = () => {
                for (let j = 0; j < timetable.next_week.days.length; j++) {
                    const item = timetable.next_week.days[j]
                    for (let i = 0; i < item.pairs.length; i++) {

                        if (item.pairs[i].ev_end !== null) {
                            pairEnd = item.pairs[i].ev_end
                        } else if (item.pairs[i].pair_time_end !== null) {
                            pairEnd = item.pairs[i].pair_time_end
                        }
                        if (item.ev_start !== null) {
                            pairStart = item.ev_start
                        } else if (item.pair_time_start !== null) {
                            pairStart = item.pair_time_start
                        } else {
                            pairEnd = ''
                        }
                        if (item.pairs[i + 1] && item.pairs[i + 1].ev_start !== null) {
                            pairStartPlus = item.pairs[i + 1].ev_start
                        } else if (item.pairs[i + 1] && item.pairs[i + 1].pair_time_start !== null) {
                            pairStartPlus = item.pairs[i + 1].pair_time_start
                        }

                        if (item.num_day === 1) {
                            nextWeekArr.Monday.push(item.pairs[i]);

                            if (item.pairs[i + 1] && timeTransform(pairEnd, 20).isBefore(timeTransform(pairStartPlus, 0), 'minutes')) {
                                nextWeekArr.Monday.push({
                                    pereriv: true,
                                    ev_start_next_pair: pairStartPlus,
                                    ev_end: pairEnd,
                                    pairStart: pairStart
                                });
                            }
                        } else if (item.num_day === 2) {
                            nextWeekArr.Tuesday.push(item.pairs[i]);
                            if (item.pairs[i + 1] && timeTransform(pairEnd, 20).isBefore(timeTransform(pairStartPlus, 0), 'minutes')) {
                                nextWeekArr.Tuesday.push({
                                    pereriv: true,
                                    ev_start_next_pair: pairStartPlus,
                                    ev_end: pairEnd,
                                    pairStart: pairStart
                                });
                            }
                        } else if (item.num_day === 3) {
                            nextWeekArr.Wednesday.push(item.pairs[i]);
                            if (item.pairs[i + 1] && timeTransform(pairEnd, 20).isBefore(timeTransform(pairStartPlus, 0), 'minutes')) {
                                nextWeekArr.Wednesday.push({
                                    pereriv: true,
                                    ev_start_next_pair: pairStartPlus,
                                    ev_end: pairEnd,
                                    pairStart: pairStart
                                });
                            }
                        } else if (item.num_day === 4) {
                            nextWeekArr.Thursday.push(item.pairs[i]);
                            if (item.pairs[i + 1] && timeTransform(pairEnd, 20).isBefore(timeTransform(pairStartPlus, 0), 'minutes')) {
                                nextWeekArr.Thursday.push({
                                    pereriv: true,
                                    ev_start_next_pair: pairStartPlus,
                                    ev_end: pairEnd,
                                    pairStart: pairStart
                                });
                            }

                        } else if (item.num_day === 5) {
                            nextWeekArr.Friday.push(item.pairs[i]);
                            if (item.pairs[i + 1] && timeTransform(pairEnd, 20).isBefore(timeTransform(pairStartPlus, 0), 'minutes')) {
                                nextWeekArr.Friday.push({
                                    pereriv: true,
                                    ev_start_next_pair: pairStartPlus,
                                    ev_end: pairEnd,
                                    pairStart: pairStart
                                });
                            }

                        } else if (item.num_day === 6) {
                            nextWeekArr.Saturday.push(item.pairs[i]);
                            if (item.pairs[i + 1] && timeTransform(pairEnd, 20).isBefore(timeTransform(pairStartPlus, 0), 'minutes')) {
                                nextWeekArr.Saturday.push({
                                    pereriv: true,
                                    ev_start_next_pair: pairStartPlus,
                                    ev_end: pairEnd,
                                    pairStart: pairStart
                                });
                            }

                        } else if (item.num_day === 7) {
                            nextWeekArr.Sunday.push(item.pairs[i]);
                            if (item.pairs[i + 1] && timeTransform(pairEnd, 20).isBefore(timeTransform(pairStartPlus, 0), 'minutes')) {
                                nextWeekArr.Sunday.push({
                                    pereriv: true,
                                    ev_start_next_pair: pairStartPlus,
                                    ev_end: pairEnd,
                                    pairStart: pairStart
                                });
                            }
                        }
                    }
                }
            }
            sortTimeTableNextWeek()
            return [
                {day_name: nextWeekArr.Monday, day_name_ru: 'Пн', day_num: 8, item_num: 7},
                {day_name: nextWeekArr.Tuesday, day_name_ru: 'Вт', day_num: 9, item_num: 8},
                {day_name: nextWeekArr.Wednesday, day_name_ru: 'Ср', day_num: 10, item_num: 9},
                {day_name: nextWeekArr.Thursday, day_name_ru: 'Чт', day_num: 11, item_num: 10},
                {day_name: nextWeekArr.Friday, day_name_ru: 'Пт', day_num: 12, item_num: 11},
                {day_name: nextWeekArr.Saturday, day_name_ru: 'Сб', day_num: 13, item_num: 12},
                {day_name: nextWeekArr.Sunday, day_name_ru: 'Вс', day_num: 14, item_num: 13},
            ]


        } else return [
            {day_name: [], day_name_ru: 'Пн', day_num: 8, item_num: 7},
            {day_name: [], day_name_ru: 'Вт', day_num: 9, item_num: 8},
            {day_name: [], day_name_ru: 'Ср', day_num: 10, item_num: 9},
            {day_name: [], day_name_ru: 'Чт', day_num: 11, item_num: 10},
            {day_name: [], day_name_ru: 'Пт', day_num: 12, item_num: 11},
            {day_name: [], day_name_ru: 'Сб', day_num: 13, item_num: 12},
            {day_name: [], day_name_ru: 'Вс', day_num: 14, item_num: 13},
        ]
    }
})


export const getDeviceType = (state) => {
    return state.common.mobile
}
export const getLoadingStatus = (state) => {
    return state.common.loading
}

export const getSideBarStatus = (state) => {
    return state.common.sideBarShow
}

export const getNotification = (state) => {
    return state.common.notification
}
export const getNotificationRead = (state) => {
    return state.common.notificationRead
}
export const getNotificationStatus = (state) => {
    return state.common.notificationStatus
}

export const getShortName = (state) => {
    return state.common.shortName
}
export const getTitleMobile = (state) => {
    return state.common.mobileTitle
}
export const getCurDay = (state) => {
    return state.common.curDay
}
export const getStylesTimetable = (state) => {
    return state.common.stylesTimetable
}
export const getStylesPayment = (state) => {
    return state.common.stylesPayment
}

export const getInputStatus = (state) => {
    return state.common.inputStatus
}

export const getWeekDates = () => {
    const startDay = moment().startOf('week').startOf('day');
    const endDay = moment().add(1, 'week').endOf('week').endOf('day');
    const calendar = [];
    const day = startDay.clone();
    while (!day.isAfter(endDay)) {
        calendar.push(day.clone());
        day.add(1, 'day')
    }
    return calendar;

}
export const getWeekDatesMobile = () => {

    let WeekDates = getWeekDates();
    let weekDates = []
    WeekDates.forEach((date) => {
        weekDates.push(date.format("D"))
    });
    return weekDates
}
export const getDates = () => {
    let currentDayNum = Number(moment().format("E"));
    let currentTime = moment().format("HH:MM");
    let currentDate = moment().format("DD.MM.YYYY");

    return [currentDayNum, currentTime, currentDate]
}


export const getStudentAccount = (state) => {
    return state.studentHome.account
}


export const getAdminAccount = (state) => {
    return state.adminHomeReducer.account
}
export const getPermissions = (state) => {
    return state.user.permissions
}
export const getTimeTableSearchEvent = (state) => {
    return state.user.timeTableSearchEvent
}
export const getEmployeeAccount = (state) => {
    return state.employeeHome.account
}

export const getSideBarState = createSelector([getStudentAccount], (account) => {

    let headmen = false;
    let plainId = false;

    if (account) {

        if (account.data && account.data.plan && account.data.plan.id) {
            plainId = account.data.plan.id
        }
        if (account.data && account.data.is_headman) {
            headmen = account.data.is_headman
        }
    }
    return [
        {
            sidebar_item: 'Расписание',
            title: 'Расписание',
            icon_type: 'icon-calendar',
            path: '/timetable',
            main: () => <Timetable/>,
            plainId: true,
            is_headman: true,
            Curriculum: false
        },
        {
            sidebar_item: 'Wi-Fi',
            path: '/wi-fi',
            title: 'Wi-Fi',
            icon_type: 'icon-wifi',
            main: () => <WIFI headmen={headmen}/>,
            plainId: true,
            is_headman: headmen,
            Curriculum: false
        },
        {
            sidebar_item: 'Оплата',
            path: '/pay',
            title: 'Оплата',
            icon_type: 'icon-money',
            main: () => <Receipt/>,
            plainId: true,
            is_headman: true,
            Curriculum: false
        },
        {
            sidebar_item: 'Успеваемость',
            path: '/progress',
            title: 'Успеваемость',
            icon_type: 'icon-chart',
            main: () => <Progress/>,
            plainId: true,
            is_headman: true,
            Curriculum: false
        },
        {
            sidebar_item: 'Аттестация',
            path: '/attestation',
            title: 'Аттестация',
            icon_type: 'icon-attestation',
            main: () => <Attestation/>,
            plainId: true,
            is_headman: true,
            Curriculum: false
        },
        {
            sidebar_item: `Корпоративная почта`,
            path: '/email',
            title: 'Корпоративная почта',
            icon_type: 'icon-email',
            main: () => <Email/>,
            plainId: true,
            is_headman: true,
            Curriculum: false
        },
        {
            sidebar_item: `Электронная библиотека`,
            path: `/library`,
            title: 'Электронная библиотека',
            icon_type: 'icon-library',
            main: () => <Library/>,
            plainId: true,
            is_headman: true,
            Curriculum: false
        },
        {
            sidebar_item: `Учебный план`,
            path: `//dekanat.bstu.ru/public/plans/${plainId}/print/`,
            title: 'Учебный план',
            icon_type: 'icon-plan ',
            target: '_blank',
            plainId: plainId,
            is_headman: true,
            Curriculum: true
        },
        process.env.NODE_ENV === 'development' && {
            sidebar_item: `Drag`,
            path: `/drag`,
            title: 'Drag',
            icon_type: 'icon-attestation ',
            main: () => <Drag/>,
            plainId: true,
            is_headman: true,
            Curriculum: true
        },
        process.env.NODE_ENV === 'development' && {
            sidebar_item: `Верстка`,
            path: '/dev',
            title: 'Верстка',
            icon_type: 'plan_icon',
            main: () => <DEV/>,
            plainId: true,
            is_headman: true,
            Curriculum: true
        },
    ]
})
export const getSideBarAdminState = createSelector(getAdminAccount, (account) => {
    return [
        {
            sidebar_item: `Отчеты Обновлений`,
            path: `/reports`,
            title: 'Отчеты Обновлений',
            main: () => <AdminReport/>,
            icon_type: 'icon-chart',
            plainId: true,
            is_headman: true,
            Curriculum: false
        },
    ]
})
export const getSideBarEmployeeState = createSelector([getEmployeeAccount, getPermissions], (account, permissions) => {
    return [
        {
            sidebar_item: 'Расписание',
            title: 'Расписание',
            icon_type: 'icon-calendar',
            path: '/timetable',
            main: () => <Timetable/>,
            plainId: true,
            is_headman: true,
            Curriculum: false
        },
        {
            sidebar_item: 'Wi-Fi',
            path: '/wi-fi',
            title: 'Wi-Fi',
            icon_type: 'icon-wifi',
            main: () => <WIFI headmen={true}/>,
            plainId: true,
            is_headman: true,
            Curriculum: false
        },
        {
            sidebar_item: `Корпоративная почта`,
            path: '/email',
            title: 'Корпоративная почта',
            icon_type: 'icon-email',
            main: () => <Email/>,
            plainId: true,
            is_headman: true,
            Curriculum: false
        },

    ]
})


export const getTimeTableSearch = (state) => {
    return state.user.searchResultTimetable
}
export const getUserTimeTableLiveSearchHistory = (state) => {
    return state.studentHome.timeTableSearchHistory
}


export const getStudent = (state) => {
    return state.studentHome.student
}

export const getUniver = (state) => {
    return state.studentHome.univer
}
export const getAttestation = (state) => {
    return state.studentHome.attestation
}
export const getAdminReport = (state) => {
    return state.adminHomeReducer.report
}

export const getAttestationYears = createSelector(getAttestation, (attestation) => {
    let years = []
    for (let i = 0; i < attestation.length; i++) {
        years.push(attestation[i].date_start.slice(6))
    }
    let sortYears = Array.from(new Set(years))
    return [sortYears, years]
})


export const getEmail = (state) => {
    return state.user.email
}


export const getTimeTableError = (state) => {
    return state.errors.timetable
}
export const getEmailError = (state) => {
    return state.errors.email
}
export const getProgressStudentError = (state) => {
    return state.errors.progress_student
}
export const getProgressStudent = (state) => {
    return state.studentHome.progress
}
export const getAttestationStudentError = (state) => {
    return state.errors.attestation_student
}
export const getWifiStudentError = (state) => {
    return state.errors.wifi
}
export const getPfuStudentError = (state) => {
    return state.errors.pfu_student
}

export const nameTransformProgress = (event_type_id) => {
    switch (event_type_id) {
        case 'Экзамен': {
            return 'Эк'
        }
        case 'Курсовой проект': {
            return 'Кп'
        }
        case 'Курсовая работа': {
            return 'Кр'
        }
        case 'Дифференцированный зачет': {
            return 'Дз'
        }
        case 'Зачет': {
            return 'Зч'
        }
        default: {
            return
        }
    }
}
export const titleTransformProgress = (event_type_id) => {
    switch (event_type_id) {
        case 'Экзамен': {
            return 'Экзамен'
        }
        case 'Курсовой проект': {
            return 'Курсовой проект'
        }
        case 'Курсовая работа': {
            return 'Курсовая работа'
        }
        case 'Дифференцированный зачет': {
            return 'Дифференцированный зачет'
        }
        case 'Зачет': {
            return 'Зачет'
        }
        default: {
            return
        }
    }
}
export const classTransformProgress = (event_type_name) => {
    switch (event_type_name) {
        case 'Экзамен': {
            return 'legends__type types-subject_exam'
        }
        case 'Курсовой проект': {
            return 'legends__type types-subject_course-project'
        }
        case 'Курсовая работа': {
            return 'legends__type types-subject_course-work'
        }
        case 'Дифференцированный зачет': {
            return 'legends__type types-subject_dif-zach'
        }
        case 'Зачет': {
            return 'legends__type types-subject_credit'
        }
        default: {
            return
        }
    }
}
