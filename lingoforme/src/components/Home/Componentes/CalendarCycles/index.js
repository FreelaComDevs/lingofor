import { useState, useMemo } from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import moment from "moment";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RenderDay = ({ date, dayIdx, cycle, selectedDate, setSelectedDate }) => {
  const startCycle = date.isSame(cycle.start);
  const endCycle = date.isSame(cycle.end);
  const hasCycle = date.isBetween(cycle.start, cycle.end);
  const hasClass = false;
  const isToday = date.isSame(selectedDate.format("YYYY-MM-DD"));

  return (
    <div key={date} className={classNames(dayIdx > 6 && "", "py-2")}>
      <div className="relative">
        <div
          className={classNames(
            startCycle || endCycle || hasCycle ? "bg-[#B8B8B9] opacity-30" : "",
            startCycle ? "w-[50%] right-0	" : "",
            endCycle ? "w-[50%] left-0" : "",
            "absolute w-full h-full z-20"
          )}
        ></div>
        <button
          type="button"
          className={classNames(
            isToday ? "border-[#555D67] border" : "",
            startCycle || endCycle
              ? "border-[#42474f] bg-[#555D67] border-2 text-[#F1F1F1]"
              : "",
            hasClass ? "border-[1px] border-[#555D67]" : "",
            "mx-auto flex h-8 w-8 items-center justify-center rounded-full",
            "text-[#333C49] text-sm relative z-20"
          )}
          onClick={() => {
            setSelectedDate(date);
          }}
        >
          <time
            dateTime={date.format()}
            className={classNames(
              startCycle || endCycle ? "text-[#F1F1F1]" : ""
            )}
          >
            {date.format("DD")}
          </time>
        </button>
      </div>
    </div>
  );
};

const generateDays = (selectedDay, cycle, selectedDate, setSelectedDate) => {
  const lastDay = selectedDay.daysInMonth();
  const month = selectedDay.month() + 1;
  const year = selectedDay.year();
  const days = [];

  for (let i = 1; i <= lastDay; i++) {
    const date = moment(`${year}-${month}-${i}`);
    if (i === 1) {
      for (let j = 1; j <= date.day(); j++) {
        days.push(<div key={"empty-calendar-" + j}></div>);
      }
    }
    days.push(
      <RenderDay
        key={i}
        date={date}
        dayIdx={i}
        currentDate={selectedDay}
        cycle={cycle}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    );
  }
  return days;
};

const CalendarHeader = ({ prevMonth, nextMonth, currentCycle }) => {
  return (
    <>
      <h5 className="text-[#004FFF] text-lg font-bold mb-4">Meus ciclos</h5>
      <div className="flex items-center mb-4 justify-between">
        <button
          type="button"
          className={clsx(
            "-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500",
            prevMonth ? "" : "text-gray-100 cursor-not-allowed"
          )}
          onClick={prevMonth}
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <div
          className="flex-auto justify-center flex cursor-pointer"
          onClick={currentCycle}
        >
          <span className="border-[#5778FB] text-[#5778FB] border-[1px] rounded-md px-3 py-1 text-xs">
            CICLO ATUAL
          </span>
        </div>
        <button
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          onClick={nextMonth}
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </>
  );
};

const Calendar = ({
  hasCycle,
  date,
  nextMonth,
  prevMonth,
  currentCycle,
  cycle,
  selectedDate,
  setSelectedDate,
}) => {
  const days = useMemo(() => {
    return generateDays(date, cycle, selectedDate, setSelectedDate);
  }, [date, cycle]);

  return (
    <div className="px-4 py-5">
      {hasCycle && (
        <CalendarHeader
          nextMonth={nextMonth}
          prevMonth={prevMonth}
          currentCycle={currentCycle}
        />
      )}
      <h4 className="font-bold text-[#333C49] text-lg">
        {date.format("MMMM YYYY")}
      </h4>
      <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
        <div className="text-[#333C49] text-sm font-bold">S</div>
        <div className="text-[#333C49] text-sm font-bold">M</div>
        <div className="text-[#333C49] text-sm font-bold">T</div>
        <div className="text-[#333C49] text-sm font-bold">W</div>
        <div className="text-[#333C49] text-sm font-bold">T</div>
        <div className="text-[#333C49] text-sm font-bold">F</div>
        <div className="text-[#333C49] text-sm font-bold">S</div>
      </div>
      <div className="mt-2 grid grid-cols-7 text-sm">{days}</div>
    </div>
  );
};

const CalendarCycleRender = ({
  user,
  date,
  setDate,
  cycle,
  selectedDate,
  setSelectedDate,
}) => {
  const nextMonth = () => {
    setDate(date.clone().add(1, "months"));
  };

  const prevMonth = () => {
    setDate(date.clone().subtract(1, "months"));
  };

  const currentCycle = () => {
    let myDate =
      user?.plans[0]?.student?.contractPlanStudents[0]
        ?.studentPlanB2BRenewalCycle?.startCy ?? null;
    myDate = myDate.split("T");
    myDate = myDate[0];
    setDate(moment(myDate));
  };

  let initialCycle =
    user.plans[0].student.contractPlanStudents[0].studentPlanB2BRenewalCycle
      .initial;
  initialCycle = initialCycle.split("T");
  initialCycle = initialCycle[0];

  return (
    <>
      <Calendar
        date={date.clone()}
        nextMonth={nextMonth}
        prevMonth={date.isSameOrBefore(initialCycle) ? null : prevMonth}
        currentCycle={currentCycle}
        hasCycle={true}
        cycle={cycle}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        date={date.clone().add(1, "months")}
        cycle={cycle}
      />
    </>
  );
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(
  translate("translations")(CalendarCycleRender)
);
