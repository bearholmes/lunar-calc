import { DateInputForm } from './components/DateInput/DateInputForm';
import { ErrorMessage } from './components/ErrorMessage';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { LunarDisplay } from './components/LunarDisplay';
import { Timeline } from './components/Timeline/Timeline';
import { useBirthdayTimeline, useLunarCalculator } from './hooks';
import './styles/app.css';

export const App = () => {
  const { form, lunar, error, isShowLunarDay, hasSubmitted, updateForm, calculateLunar } =
    useLunarCalculator();

  const { timeline: timelineItems, isLimited, actualYears, maxYears } = useBirthdayTimeline(lunar);

  const handleSubmit = () => {
    calculateLunar();
  };

  return (
    <div id="app" className="max-w-[375px] min-w-[375px] mx-auto px-4">
      <Header />

      <DateInputForm form={form} onFormChange={updateForm} onSubmit={handleSubmit} />

      {isShowLunarDay && lunar && <LunarDisplay lunar={lunar} />}

      {timelineItems.length > 0 && (
        <>
          <Timeline items={timelineItems} />
          {isLimited && (
            <div className="mt-3 mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">
                ⚠️ 음력 계산 제한(~2101년)으로 인해 {actualYears}년치 타임라인만 표시됩니다.
                <br />
                <span className="text-xs text-yellow-700">
                  (전체 {maxYears}년 중 {maxYears - actualYears}년 누락)
                </span>
              </p>
            </div>
          )}
        </>
      )}

      {hasSubmitted && error && <ErrorMessage message={error} />}

      <Footer />
    </div>
  );
};
