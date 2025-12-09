import { useState, useEffect } from 'react';
import { CalendarIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface DateTimePickerProps {
    label: string;
    name: string;
    value?: string;
    onChange: (value: string) => void;
    error?: string;
    required?: boolean;
}

export default function DateTimePicker({
    label,
    name,
    value = '',
    onChange,
    error,
    required = false
}: DateTimePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedHour, setSelectedHour] = useState(9);
    const [selectedMinute, setSelectedMinute] = useState(0);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    useEffect(() => {
        if (value) {
            const date = new Date(value);
            setSelectedDate(date);
            setSelectedHour(date.getHours());
            setSelectedMinute(date.getMinutes());
        }
    }, [value]);

    const today = new Date();
    const currentYear = currentMonth.getFullYear();
    const currentMonthIndex = currentMonth.getMonth();

    const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1).getDay();

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const handleDateSelect = (day: number) => {
        const newDate = new Date(currentYear, currentMonthIndex, day);

        // Prevent selecting past dates
        if (newDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
            return;
        }

        setSelectedDate(newDate);

        // If selecting today, ensure time is not in the past
        if (newDate.toDateString() === today.toDateString()) {
            const currentHour = today.getHours();
            const currentMinute = today.getMinutes();

            if (selectedHour < currentHour || (selectedHour === currentHour && selectedMinute < currentMinute)) {
                setSelectedHour(currentHour);
                setSelectedMinute(currentMinute);
                updateValue(newDate, currentHour, currentMinute);
                return;
            }
        }

        updateValue(newDate, selectedHour, selectedMinute);
    };

    const handleHourChange = (hour: number) => {
        if (selectedDate && selectedDate.toDateString() === today.toDateString()) {
            const currentHour = today.getHours();
            const currentMinute = today.getMinutes();

            // If selecting current hour, ensure minute is not in the past
            if (hour === currentHour && selectedMinute < currentMinute) {
                setSelectedMinute(currentMinute);
            }

            // Don't allow past hours for today
            if (hour < currentHour) {
                return;
            }
        }

        setSelectedHour(hour);
        if (selectedDate) {
            const minute = (selectedDate.toDateString() === today.toDateString() && hour === today.getHours() && selectedMinute < today.getMinutes())
                ? today.getMinutes()
                : selectedMinute;
            updateValue(selectedDate, hour, minute);
        }
    };

    const handleMinuteChange = (minute: number) => {
        if (selectedDate && selectedDate.toDateString() === today.toDateString()) {
            const currentHour = today.getHours();
            const currentMinute = today.getMinutes();

            // Don't allow past minutes for current hour today
            if (selectedHour === currentHour && minute < currentMinute) {
                return;
            }
        }

        setSelectedMinute(minute);
        if (selectedDate) {
            updateValue(selectedDate, selectedHour, minute);
        }
    };

    const updateValue = (date: Date, hours: number, minutes: number) => {
        const dateTime = new Date(date);
        dateTime.setHours(hours, minutes);
        onChange(dateTime.toISOString());
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        const newMonth = new Date(currentMonth);
        if (direction === 'prev') {
            // Don't allow navigating to past months
            if (newMonth.getMonth() === today.getMonth() && newMonth.getFullYear() === today.getFullYear()) {
                return;
            }
            newMonth.setMonth(newMonth.getMonth() - 1);
        } else {
            newMonth.setMonth(newMonth.getMonth() + 1);
        }
        setCurrentMonth(newMonth);
    };

    const generateHourOptions = () => {
        const hours = [];
        for (let hour = 0; hour < 24; hour++) {
            hours.push(hour);
        }
        return hours;
    };

    const generateMinuteOptions = () => {
        const minutes = [];
        for (let minute = 0; minute < 60; minute++) {
            minutes.push(minute);
        }
        return minutes;
    };

    const formatDisplayValue = () => {
        if (!selectedDate) return '';
        const date = selectedDate.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        const timeString = `${selectedHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
        return `${date} at ${timeString}`;
    };

    const isPastDate = (day: number) => {
        const date = new Date(currentYear, currentMonthIndex, day);
        return date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    };

    const isToday = (day: number) => {
        const date = new Date(currentYear, currentMonthIndex, day);
        return date.toDateString() === today.toDateString();
    };

    const isSelected = (day: number) => {
        if (!selectedDate) return false;
        const date = new Date(currentYear, currentMonthIndex, day);
        return date.toDateString() === selectedDate.toDateString();
    };

    return (
        <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full px-4 py-3 bg-white/70 backdrop-blur-sm border-2 rounded-xl shadow-lg transition-all duration-200 text-left flex items-center justify-between ${error
                            ? 'border-red-300 shadow-red-100/50 focus:border-red-400 focus:shadow-red-200/50'
                            : 'border-slate-200/50 shadow-slate-200/50 hover:border-primary/30 focus:border-primary focus:shadow-primary/20'
                        }`}
                >
                    <span className={selectedDate ? 'text-slate-900' : 'text-slate-500'}>
                        {selectedDate ? formatDisplayValue() : 'Select date and time'}
                    </span>
                    <CalendarIcon className="text-slate-400" size={20} />
                </button>

                {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl shadow-slate-300/20 z-50 p-6">
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-4">
                            <button
                                type="button"
                                onClick={() => navigateMonth('prev')}
                                disabled={currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear()}
                                className="p-2 hover:bg-slate-100/50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeftIcon size={20} className="text-slate-600" />
                            </button>

                            <h3 className="text-lg font-semibold text-slate-800">
                                {monthNames[currentMonthIndex]} {currentYear}
                            </h3>

                            <button
                                type="button"
                                onClick={() => navigateMonth('next')}
                                className="p-2 hover:bg-slate-100/50 rounded-lg transition-colors"
                            >
                                <ChevronRightIcon size={20} className="text-slate-600" />
                            </button>
                        </div>

                        {/* Day Names */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {dayNames.map(day => (
                                <div key={day} className="text-center text-xs font-medium text-slate-500 py-2">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1 mb-6">
                            {/* Empty cells for days before month starts */}
                            {Array.from({ length: firstDayOfMonth }, (_, i) => (
                                <div key={`empty-${i}`} className="h-10" />
                            ))}

                            {/* Days of the month */}
                            {Array.from({ length: daysInMonth }, (_, i) => {
                                const day = i + 1;
                                const isPast = isPastDate(day);
                                const isTodayDate = isToday(day);
                                const isSelectedDate = isSelected(day);

                                return (
                                    <button
                                        key={day}
                                        type="button"
                                        onClick={() => handleDateSelect(day)}
                                        disabled={isPast}
                                        className={`h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200 ${isPast
                                                ? 'text-slate-300 cursor-not-allowed'
                                                : isSelectedDate
                                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                                    : isTodayDate
                                                        ? 'bg-primary/10 text-primary border border-primary/20'
                                                        : 'text-slate-700 hover:bg-slate-100/50'
                                            }`}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Time Selection */}
                        <div className="border-t border-slate-200/50 pt-4">
                            <div className="flex items-center mb-4">
                                <ClockIcon className="text-slate-500 mr-2" size={16} />
                                <span className="text-sm font-medium text-slate-700">Select Time</span>
                            </div>

                            <div className="flex items-center space-x-4">
                                {/* Hour Selection */}
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-slate-600 mb-2">Hour</label>
                                    <div className="relative">
                                        <select
                                            value={selectedHour}
                                            onChange={(e) => handleHourChange(parseInt(e.target.value))}
                                            className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-200 text-sm"
                                        >
                                            {generateHourOptions().map(hour => {
                                                const isDisabled = selectedDate?.toDateString() === today.toDateString() &&
                                                    hour < today.getHours();

                                                return (
                                                    <option key={hour} value={hour} disabled={isDisabled}>
                                                        {hour.toString().padStart(2, '0')}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <div className="text-slate-400 text-lg font-bold pt-6">:</div>

                                {/* Minute Selection */}
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-slate-600 mb-2">Minute</label>
                                    <div className="relative">
                                        <select
                                            value={selectedMinute}
                                            onChange={(e) => handleMinuteChange(parseInt(e.target.value))}
                                            className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-200 text-sm"
                                        >
                                            {generateMinuteOptions().map(minute => {
                                                const isDisabled = selectedDate?.toDateString() === today.toDateString() &&
                                                    selectedHour === today.getHours() &&
                                                    minute < today.getMinutes();

                                                return (
                                                    <option key={minute} value={minute} disabled={isDisabled}>
                                                        {minute.toString().padStart(2, '0')}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>

                                {/* Custom Input Alternative */}
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-slate-600 mb-2">Or type time</label>
                                    <input
                                        type="time"
                                        value={`${selectedHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`}
                                        onChange={(e) => {
                                            const [hours, minutes] = e.target.value.split(':');
                                            const hour = parseInt(hours);
                                            const minute = parseInt(minutes);

                                            // Validate against current time if today
                                            if (selectedDate?.toDateString() === today.toDateString()) {
                                                const currentHour = today.getHours();
                                                const currentMinute = today.getMinutes();

                                                if (hour < currentHour || (hour === currentHour && minute < currentMinute)) {
                                                    return;
                                                }
                                            }

                                            setSelectedHour(hour);
                                            setSelectedMinute(minute);
                                            if (selectedDate) {
                                                updateValue(selectedDate, hour, minute);
                                            }
                                        }}
                                        min={selectedDate?.toDateString() === today.toDateString()
                                            ? `${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}`
                                            : "00:00"
                                        }
                                        max="23:59"
                                        className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-200 text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3 mt-4 pt-4 border-t border-slate-200/50">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                disabled={!selectedDate}
                                className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {error}
                </p>
            )}
        </div>
    );
}